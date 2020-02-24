import React from 'react'
import images from '../assets'

const Spinner = () => {
  return (
    <div className='spinner'>
      <img src={images.spinner} alt="Loading..." />
    </div>
  )
}

export default Spinner
