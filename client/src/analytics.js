// @flow
export const sendEvent = (action: string, params: Object = {}) => { // eslint-disable-line import/prefer-default-export, max-len
  try {
    if (window.gtag) {
      window.gtag('event', action, {
        ...params,
        ...window.analyticsParams,
      })
    }
  } catch (err) {
    console.log('Detected error sendingEvent', err)
  }
}