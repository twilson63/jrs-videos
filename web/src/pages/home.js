import React from 'react'
import { Link } from 'react-router-dom'
import { map } from 'ramda'
import { connect } from 'react-redux'
import { getGroups } from '../actions'
const DB = process.env.REACT_APP_DB

const GroupItem = props => {
  let url = 'http://fillmurray.com/200/200'
  if (props.id) {
    url = `${DB}/${props.id.replace('/', '%2f')}/logo.png`
  }
  return (
    <li className='flex items-center lh-copy pa3 ph0-l bb b--black-10'>
      <img className='w2 h2 w3-ns h3-ns br-100' src={url} />
      <div className='pl3 flex-auto'>
        <span className='f6 db black-70'>{props.name}</span>
        <span className='f6 db black-70' />
      </div>
      <div>
        <Link
          to={'/groups/' + props.id}
          className='f6 link blue hover-dark-gray'
        >
          show
        </Link>
      </div>
    </li>
  )
}

class Home extends React.Component {
  componentDidMount () {
    this.props.dispatch(getGroups)
  }
  render () {
    const { props } = this
    return (
      <div>
        <header className='ph4 pv2 bg-black-70 white'>
          <h1 className='f2 fw3'>JRS Videos</h1>
        </header>
        <main className='pa4  measure center'>
          <h3 className='f4 fw3'>Groups</h3>
          <ul className='list pl0 mt0 measure center'>
            {
              map(
                ({ _id, ...group }) => (
                  <GroupItem key={_id} id={_id} {...group} />
                ),
                props.groups
              )
            }
          </ul>
        </main>
        <footer className='pa4 tc'>
          <div className='f6 fw4'>Cant find a video?</div>
        </footer>
      </div>
    )
  }
}

export default connect(state => state)(Home)
