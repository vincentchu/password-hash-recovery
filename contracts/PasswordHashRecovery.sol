pragma solidity ^0.4.15;

// Derp. SOLC-JS doesn't support importing, so we'll ickily cut/paste
// SHA1 contract here (https://github.com/ethereum/solc-js/issues/114).
// SHA1 Contract itself shamelessly copied from:
// https://gist.github.com/D-Nice/43d60515263f9854bd92e952dfc0dea5
contract SHA1 {
    uint8[4] shift = [3, 8, 14, 16];
    uint constant leftAlign = 16**56;
    uint constant prep = 16**55; //allow extra bits as requested in spec
    uint constant h0 = 1732584193 * prep; //0x67452301
    uint constant h1 = 4023233417 * prep; //0xEFCDAB89
    uint constant h2 = 2562383102 * prep; //0x98BADCFE
    uint constant h3 = 271733878 * prep; //0x10325476
    uint constant h4 = 3285377520 * prep; //0xC3D2E1F0

    uint[4] K = [1518500249 * prep, 1859775393 * prep, 2400959708 * prep, 3395469782 * prep];
                //0x5A827999        //0x6ED9EBA1       //8F1BBCDC         //CA62C1D6

    function digest(string _m) internal returns (bytes h) {
        bytes memory raw = bytes(_m);

        //PREPARE PRE-PROCESSING
        uint reusedPos = raw.length + 32; //reusing due to stack depth limit

        //BEGIN 1-BIT APPEND AT LAST CHAR
        assembly {
            let extraBitShift := mload(0x40)
            extraBitShift := exp(16, 62)
            mstore(add(raw, reusedPos), mul(0x80, extraBitShift))

        }
        uint[2] memory A;
        A[0] = h0;
        uint[2] memory B;
        B[0] = h1;
        uint[2] memory C;
        C[0] = h2;
        uint[2] memory D;
        D[0] = h3;
        uint[2] memory E;
        E[0] = h4;

        uint rawMsgLen;

        for(uint chunk = 0; chunk <= (raw.length - (raw.length / 64) * 8) / 56; chunk++) {
            bytes memory tmp = new bytes(64);

            if(chunk == (raw.length - (raw.length / 64) * 8) / 56)
                rawMsgLen = raw.length * 8;

            reusedPos = 32 + (64 * chunk); //didnt know
            //BEGIN CHAR LENGTH APPEND AT ENDING OF LAST 64-BITS
            //CHUNK MESSAGE TO 512-BITS
            assembly {
                let endBits := mload(0x40)
                endBits := mload(add(raw, add(reusedPos, 32)))
                //endBits := and(endBits, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000)
                //no need for above
                endBits := or(endBits, rawMsgLen)

                mstore(add(tmp, 0), 0x20) //mem offset
                mstore(add(tmp, 64), mload(add(raw, reusedPos)))
                mstore(add(tmp, 96), endBits)
                mstore(add(tmp, 32), 64)
            }

            //BREAK 512-BIT CHUNK INTO SIXTEEN 32-BIT WORDS
            uint[80] memory t;

            //~ 15k gas cost used up to here
            for(var i = 0; i < 16; i++) {
                assembly {
                    mstore(add(t, mul(i, 32)), and(mload(add(tmp, add(64, mul(i, 4)))), 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000))
                }
            }

            t = expandWords(t);

            (A[1], B[1], C[1], D[1], E[1]) = (hashLoop(t, A[0], B[0], C[0], D[0], E[0]));

            A[0] = ((A[0] + A[1]) * 16) / 16; //add then truncate
            B[0] = ((B[0] + B[1]) * 16) / 16;
            C[0] = ((C[0] + C[1]) * 16) / 16;
            D[0] = ((D[0] + D[1]) * 16) / 16;
            E[0] = ((E[0] + E[1]) * 16) / 16;

        }
        A[0] *= 16;
        B[0] /= 16 ** 7;
        C[0] /= 16 ** 15;
        D[0] /= 16 ** 23;
        E[0] /= 16 ** 31;

        h = toBytes20ish(A[0] + B[0] + C[0] + D[0] + E[0]);
    }

    function expandWords(uint[80] t) private returns (uint[80]) {
        for(var i = 16; i < t.length; i++) {//~1800 gas per round
            uint tRes;
            uint tNext;

            // ROTL1(((i-3 XOR i-8) XOR i-14) XOR i-16)
            for (var x = 1; x < 4; x++) {
                if (x == 1)
                    tRes = t[i-shift[0]];
                tNext = t[i-shift[x]];
                tRes = tRes ^ tNext;
            }
            assembly {
                mstore(add(t, mul(i, 32)), and(or(div(tRes, exp(2,31)), mul(tRes, exp(2,1))), 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000))
            }

        }
        return t;
    }

    function hashLoop(uint[80] t, uint a, uint b, uint c, uint d, uint e)
    private returns (uint A, uint B, uint C, uint D, uint E) {
        A = a;
        B = b;
        C = c;
        D = d;
        E = e;
        uint f;
        uint m;
        for (var i = 0; i < t.length; i++) { //~1200 gas cost per round
            if (i <= 19)
                f = f_1(t[i], B, C, D);
            else if (i <= 39 || i >= 60)
                f = f_2(t[i], B, C, D);
            else if (i <= 59)
                f = f_3(t[i], B, C, D);
            m = ROTL(A, 5) + f + E + K[i/20] + t[i]/16;
            m = m * 16; //truncate result
            E = D;
            D = C;
            C = ((ROTL(B, 30) * 16) / leftAlign) * prep;
            B = A;
            A = (m / leftAlign) * prep;
        }

    }

    function f_1(uint t, uint B, uint C, uint D)
    private
    returns (uint f) {
        f = B & C;
        f = f | ~B & D;
    }

    function f_2(uint t, uint B, uint C, uint D)
    private
    returns (uint f) {
        f = B ^ C;
        f = f ^ D;
    }

    function f_3(uint t, uint B, uint C, uint D)
    private
    returns (uint f) {
        f = ((B & C) | (B & D)) | C & D;

    }

    function toBytes20ish(uint256 x) private constant returns (bytes b) {
        b = new bytes(20);
        assembly { mstore(add(b, 32), x) }
    }

    //not fully working, issue when doing larger uints
    function toBytes20(uint256 x) private constant returns (bytes20 b) {
        assembly {
            x
            0x01000000000000000000000000
            mul
            swap1
            dup1
            mstore
        }
    }

    function ROTL(uint x, uint y) private returns (uint rotated) {
        assembly {
            rotated := or(div(x, exp(2, sub(32, y))), mul(x, exp(2,y)))
        }
    }
}


contract PasswordHashRecovery is SHA1 {
  event PasswordCracked(address cracked_by, uint256 bounty, string password, bytes hash);
  event AttemptFailed(address source, string password, bytes hash);

  address owner;
  uint256 bounty;
  bytes20 hash;

  function PasswordHashRecovery(bytes20 _hash) payable {
    owner = msg.sender;
    bounty = msg.value;
    hash = _hash;
  }

  function solve(string password) returns (bool) {
    var hashed_password = digest(password);

    if (sha3(hashed_password) == sha3(hash)) {
      msg.sender.transfer(this.balance);
      PasswordCracked(msg.sender, bounty, password, hashed_password);

      return true;
    }

    AttemptFailed(msg.sender, password, hashed_password);
    return false;
  }
}
