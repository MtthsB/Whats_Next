import React, { useEffect, useRef } from 'react'
import { Country } from '../models'
import images from '../assets'

type Props = {
  data?: Country;
  handleClose(): void;
  hasError?: boolean;
}

const Popup = (props: Props) => {
  const clickRef = useRef()

  const handleClick = (event: any) => {
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
    return keys.map((key, index) => renderRow(key, index))
  }

  const renderRow = (key, index) => {
    return (
      <div key={`${index}-${key}`} className="popup__item">
        <img src={images[key]} alt={key} className="popup__img" />
        <span className="popup__stat">{props?.data[key]}</span>
      </div>
    )
  }

  if (props.hasError) {
    return (
      <section className="popup" onClick={handleClick}>
        <div className="popup__error" ref={clickRef}>
          Congratulations, you broke the system!
        </div>
      </section>
    )
  } else {
    return (
      <section className="popup" onClick={handleClick}>
        <div className="popup__content" ref={clickRef}>
          {renderContent()}
        </div>
      </section>
    )
  }
}

export default Popup
