import React, { useEffect, useRef } from 'react'
import { Country } from '../models'

type Props = {
  data: Country;
  handleClose(): void;
}
const Popup = (props: Props) => {
  const clickRef = useRef()

  const handleClick = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      props.handleClose()
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClick)
    }
  })

  return (
    <div className="popup" onClick={handleClick}>
      <div className="popup__content" ref={clickRef}>
        {props.data.name}
      </div>
    </div>
  )
}

export default Popup
