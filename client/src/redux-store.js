// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import createLogger from 'redux-logger'
import { reducer as sessionReducer } from './state/session'

const logger = createLogger()
const reducer = combineReducers({
  forms: formReducer,
  session: sessionReducer,
})

const store = createStore(reducer, applyMiddleware(logger))

export default store
