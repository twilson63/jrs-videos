import React from 'react'

import { Link } from 'react-router-dom'
import { getVideos } from '../../actions'
import { connect } from 'react-redux'
import { map } from 'ramda'
import Thumbnail from '../../components/thumbnail'

class Cards extends React.Component {
  componentDidMount () {
    const id = `group/${this.props.match.params.id}`
    this.props.dispatch(getVideos(id))
  }
  render () {
    const card = video => {
      return (
        <div key={video._id} className='fl w-25-l w-50-m w-100 pa2'>
          <Link className='link' to={`/show/${video.id}`}>
            <Thumbnail id={video.id} />
            <div className='mt2 tr'>
              {video.name}
            </div>
          </Link>
        </div>
      )
    }
    return (
      <div>
        <div className='cf pa4'>
          {map(card, this.props.videos)}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Cards)
