import React from 'react'
import { TextField } from 'jrs-react-components'
import { createVideo, getVideo, saveVideo } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { propOr, map } from 'ramda'

class VideoForm extends React.Component {
  componentDidMount () {

    if (this.props.match.params.id) {
      this.props.dispatch(getVideo('video%2f' + this.props.match.params.id))
    } else {
      this.props.dispatch({ type: 'SET_VIDEO', payload: {} })
    }
  }
  render () {
    const { props } = this
    return (
      <div className='f4 fw3 measure center'>
        <h3>Create/Update Video</h3>
        <TextField
          label='Name'
          help='Name of Video'
          value={propOr('', 'name', props.video)}
          onChange={
            e =>
              props.dispatch({
                type: 'SET_VIDEO_NAME',
                payload: e.target.value
              })
          }
        />
        <div className='mv4'>
          <label className='f6 b db mb2'>Description (optional)</label>
          <textarea
            value={propOr('', 'description', props.video)}
            onChange={
              e =>
                props.dispatch({
                  type: 'SET_VIDEO_DESCRIPTION',
                  payload: e.target.value
                })
            }
            rows={3}
            className='w-100 input-reset ba b--black-20 pa2 mb2 db'
          />
        </div>
        <TextField
          width='40'
          label='ID'
          help='Youtube ID of Video'
          value={propOr('', 'id', props.video)}
          onChange={
            e =>
              props.dispatch({ type: 'SET_VIDEO_ID', payload: e.target.value })
          }
        />
        <div className='mv4'>
          <label className='f6 b db mb2'>Group</label>
          <select
            className='w-100 input-reset ba b--black-20 pa2 mb2 db'
            value={propOr('', 'group', props.video)}
            onChange={
              e =>
                props.dispatch({
                  type: 'SET_VIDEO_GROUP',
                  payload: e.target.value
                })
            }
          >
            <option>Select Group</option>
            {map(
                group => (
                  <option key={group._id} value={JSON.stringify(group)}>
                    {group.name}
                  </option>
                ),
                props.groups
              )}
          </select>
        </div>
        <div>
          <button
            onClick={e => {
              if (props.match.params.id) {
                return props.dispatch(saveVideo).then(result => {
                  props.dispatch({ type: 'SET_VIDEO', payload: {} })
                  props.history.push('/')
                })
              }
              props.dispatch(createVideo).then(result => {
                if (result.ok) {
                  props.history.push('/')
                }
              })
            }}
            className='w-100 pv2 mt4 mb2 bg-black-70 white'
          >
            Save Video
          </button>
          <Link to='/'>
            <button className='w-100 pv2 mv2 bg-white black-70'>Cancel</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(VideoForm)
