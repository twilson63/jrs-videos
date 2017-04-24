import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { getGroups } from './actions'

const store = createStore(
  combineReducers({
    videos (state = [], action) {
      switch (action.type) {
        case 'SET_VIDEOS':
          return action.payload
        default:
          return state
      }
    },
    groups (state = [], action) {
      switch (action.type) {
        case 'SET_GROUPS':
          return action.payload
        default:
          return state
      }
    }
  }),
  applyMiddleware(thunk)
)

export default store

store.dispatch(getGroups)
