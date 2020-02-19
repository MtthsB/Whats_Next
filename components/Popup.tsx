import React from 'react'
import { Country } from '../models'

const Popup = ({ data }: { data: Country }) => {
  return (
    <div className="popup">
      <div className="popup__content">
        {data.name}
      </div>
    </div>
  )
}

export default Popup
