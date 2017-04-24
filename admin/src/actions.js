import fetch from 'isomorphic-fetch'
const DB = process.env.REACT_APP_DB
import cuid from 'cuid'
import { pluck } from 'ramda'

export const createGroup = (dispatch, getState) => {
  const { group } = getState()
  group.type = 'group'
  dispatch({ type: 'POSTING', payload: true })
  return fetch(`${DB}/group%2f${cuid()}`, {
    method: 'PUT',
    body: JSON.stringify(group)
  })
    .then(res => res.json())
    .then(result => {
      dispatch({ type: 'POSTING', payload: false })
      if (!result.ok) {
        dispatch({ type: 'ERROR', payload: result })
      }
      return result
    })
}

export const createVideo = (dispatch, getState) => {
  const { video } = getState()
  video.type = 'video'
  video.group = JSON.parse(video.group)
  dispatch({ type: 'POSTING', payload: true })
  return fetch(`${DB}/video%2f${cuid()}`, {
    method: 'PUT',
    body: JSON.stringify(video)
  })
    .then(res => res.json())
    .then(result => {
      dispatch({ type: 'POSTING', payload: false })
      if (!result.ok) {
        dispatch({ type: 'ERROR', payload: result })
      }
      return result
    })
}

export const getData = (dispatch, getState) => {
  return fetch(
    `${DB}/_all_docs?include_docs=true&start_key="group%2f"&end_key="group%2f{}"`
  )
    .then(res => res.json())
    .then(
      result =>
        dispatch({ type: 'SET_GROUPS', payload: pluck('doc', result.rows) })
    )
}

export const getVideos = id => (dispatch, getState) => {
  return fetch(`${DB}/_find`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ selector: { 'group._id': id } })
  })
    .then(res => res.json())
    .then(result => dispatch({ type: 'SET_VIDEOS', payload: result.docs }))
}

export const getVideo = id => (dispatch, getState) => {
  return fetch(`${DB}/${id}`)
    .then(res => res.json())
    .then(doc => {
      doc.group = JSON.stringify(doc.group)
      dispatch({ type: 'SET_VIDEO', payload: doc })
    })
}

export const saveVideo = (dispatch, getState) => {
  const { video } = getState()
  video.group = JSON.parse(video.group)
  dispatch({ type: 'POSTING', payload: true })
  return fetch(`${DB}/${video._id.replace('/', '%2f')}`, {
    method: 'PUT',
    body: JSON.stringify(video)
  })
    .then(res => res.json())
    .then(result => {
      dispatch({ type: 'POSTING', payload: false })
      if (!result.ok) {
        dispatch({ type: 'ERROR', payload: result })
      }
      return result
    })
}
