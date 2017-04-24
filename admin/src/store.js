import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { getData } from './actions'

import { merge } from 'ramda'

const store = createStore(
  combineReducers({
    group (state = {}, action) {
      switch (action.type) {
        case 'SET_GROUP':
          return action.payload
        case 'SET_GROUP_NAME':
          return merge(state, { name: action.payload })
        case 'SET_GROUP_DESCRIPTION':
          return merge(state, { description: action.payload })
        case 'SET_GROUP_LOGO':
          return merge(state, { logo: action.payload })
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
    },
    video (state = {}, action) {
      switch (action.type) {
        case 'SET_VIDEO':
          return action.payload
        case 'SET_VIDEO_NAME':
          return merge(state, { name: action.payload })
        case 'SET_VIDEO_DESCRIPTION':
          return merge(state, { description: action.payload })
        case 'SET_VIDEO_ID':
          return merge(state, { id: action.payload })
        case 'SET_VIDEO_GROUP':
          return merge(state, { group: action.payload })
        default:
          return state
      }
    },
    videos (state = [], action) {
      switch (action.type) {
        case 'SET_VIDEOS':
          return action.payload
        default:
          return state
      }
    }
  }),
  applyMiddleware(thunk)
)

export default store

store.dispatch(getData)
