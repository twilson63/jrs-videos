import React from 'react'

const ShowVideo = props => {
  return (
    <div className='vh-100'>
      <iframe
        src={`https://www.youtube.com/embed/${props.match.params.id}`}
        width='100%'
        height='100%'
        frameborder='0'
        allowfullscreen
      />
    </div>
  )
}

export default ShowVideo
