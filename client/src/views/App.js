// @flow
import React from 'react'

const App = (props: { children?: any }) => (
  <div>
    <div className="container">
      { props.children }
    </div>
  </div>

)

export default App
