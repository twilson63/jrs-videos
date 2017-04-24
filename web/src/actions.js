import fetch from 'isomorphic-fetch'
const DB = process.env.REACT_APP_DB
import { pluck } from 'ramda'

export const getGroups = dispatch => {
  return fetch(
    `${DB}/_all_docs?include_docs=true&start_key="group%2f"&end_key="group%2f{}"`
  )
    .then(res => res.json())
    .then(
      result =>
        dispatch({ type: 'SET_GROUPS', payload: pluck('doc', result.rows) })
    )
}

export const getVideos = id => dispatch => {
  return fetch(`${DB}/_find`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ selector: { 'group._id': id } })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      return res
    })
    .then(result => dispatch({ type: 'SET_VIDEOS', payload: result.docs }))
    .catch(err => console.log(err.message))
}
