import React, { useEffect, useRef } from 'react'
import { Country } from '../models'
import images from '../assets'

type Props = {
  data: Country;
  handleClose(): void;
}
const Popup = (props: Props) => {
  const clickRef = useRef()

  const handleClick = (event) => {
    if ((clickRef.current && !clickRef.current.contains(event.target)) || event.key === 'Escape') {
      props.handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.addEventListener('keydown', handleClick)
    }
  })

  const renderContent = () => {
    const keys = Object.keys(props.data)
    return keys.map(key => renderRow(key))
  }

  const renderRow = (key) => {
    return (
      <div className="popup__item">
        <img src={images[key]} alt={key} className="popup__img" />
        <text className="popup__stat">{props.data[key]}</text>
      </div>
    )
  }

  return (
    <section className="popup" onClick={handleClick}>
      <div className="popup__content" ref={clickRef}>
        {renderContent()}
      </div>
    </section>
  )
}

export default Popup
