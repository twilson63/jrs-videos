import React from 'react'
import { getVideos } from '../../actions'
import { find, propEq, map } from 'ramda'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class GroupShow extends React.Component {
  componentDidMount () {
    this.props.dispatch({
      type: 'SET_GROUP',
      payload: find(
        propEq('_id', 'group/' + this.props.match.params.id),
        this.props.groups
      )
    })
    this.props.dispatch(getVideos('group/' + this.props.match.params.id))
  }
  render () {
    const { props } = this
    return (
      <div className='measure center'>
        <div className='fr'>
          <Link className='link' to='/'>Return</Link>
        </div>
        <h3>{props.group.name}</h3>
        <div className='f2'>{props.group.description}</div>
        <div className='mt3 fr'>
          <Link className='link' to='/videos/new'>New Video</Link>
        </div>
        <h4>Videos</h4>
        <ul className='list pl0 mt0 measure center'>
          {map(
              video => (
                <li
                  className='flex items-center lh-copy pa3 ph0-l bb b--black-10'
                  key={video._id}
                >
                  <div className='pl3 flex-auto'>
                    <span className='f6 db black-70'>{video.name}</span>
                    <span className='f6 db black-70' />
                  </div>
                  <div>
                    <Link
                      to={'/videos/' + video._id + '/edit'}
                      className='f6 link blue hover-dark-gray'
                    >
                      edit
                    </Link>
                  </div>
                </li>
              ),
              props.videos
            )}
        </ul>
      </div>
    )
  }
}

export default connect(state => state)(GroupShow)
