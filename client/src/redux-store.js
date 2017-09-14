// @flow
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({ forms: formReducer })

const store = createStore(reducer)

export default store
