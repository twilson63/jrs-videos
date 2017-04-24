import React from 'react'
import { TextField } from 'jrs-react-components'
import { createGroup } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { propOr } from 'ramda'

class GroupForm extends React.Component {
  componentDidMount() {
    this.props.dispatch({type: 'SET_GROUP', payload: {}})
  }
  render () {
    const { props } = this
    return (
      <div className='f4 fw3 measure center'>
        <h3>Create/Update Group</h3>
        <TextField
          label='Name'
          help='Name of Video Group'
          value={propOr('', 'name', props.group)}
          onChange={
            e =>
              props.dispatch({ type: 'SET_GROUP_NAME', payload: e.target.value })
          }
        />
        <div className='mv4'>
          <label className='f6 b db mb2'>Description (optional)</label>
          <textarea
            value={propOr('', 'description', props.group)}
            onChange={
              e =>
                props.dispatch({
                  type: 'SET_GROUP_DESCRIPTION',
                  payload: e.target.value
                })
            }
            rows={3}
            className='w-100 input-reset ba b--black-20 pa2 mb2 db'
          />
        </div>
        <div className='mv4'>
          <label className='f6 b db mb2'>Logo (optional)</label>
          <input type='file' className='ba br2 bg-white' />
        </div>
        <div>
          <button
            onClick={e => {
              props.dispatch(createGroup).then(result => {
                if (result.ok) {
                  props.history.push('/')
                }
              })
            }}
            className='w-100 pv2 mt4 mb2 bg-black-70 white'
          >
            Save Group
          </button>
          <Link to='/'>
            <button className='w-100 pv2 mv2 bg-white black-70'>Cancel</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(GroupForm)
