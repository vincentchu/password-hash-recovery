// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger'
import { reducer as sessionReducer } from './state/session'
import { reducer as contractsReducer } from './state/contracts'
import { reducer as eventsReducer } from './state/events'

const logger = createLogger()
const reducer = combineReducers({
  form: formReducer,
  session: sessionReducer,
  contracts: contractsReducer,
  events: eventsReducer,
})

const store = createStore(reducer, applyMiddleware(logger))

export default store
