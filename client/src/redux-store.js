// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger'
import analytics from './analytics'
import { reducer as sessionReducer } from './state/session'
import { reducer as contractsReducer } from './state/contracts'
import { reducer as eventsReducer } from './state/events'

const reducer = combineReducers({
  form: formReducer,
  session: sessionReducer,
  contracts: contractsReducer,
  events: eventsReducer,
})

// const logger = createLogger()
// const store = createStore(reducer, applyMiddleware(logger))
const store = createStore(reducer, applyMiddleware(analytics))

export default store
