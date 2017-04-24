import React from 'react'

const Thumbnail = props => {
  return (
    <img
      className='w-100 h-100'
      src={`https://img.youtube.com/vi/${props.id}/maxresdefault.jpg`}
    />
  )
}

export default Thumbnail
