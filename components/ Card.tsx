import React from 'react'
import { Country } from '../models'

type Props = {
  country: Country;
  index: number;
  handleClick(index: number): void;
}
const Card = ({ country, index, handleClick }: Props): JSX.Element => {
  return (
    <div className="card" onClick={() => handleClick(index)}>
      <p className="card__row card__row--front">{country.name}</p>
      <div className="card__row card__row--back">
        <div className="card__flipside">
          <p>Name</p>
          <p>{country.name}</p>
        </div>
        <div className="card__flipside">
          <p>Capital</p>
          <p>{country.capital}</p>
        </div>
        <div className="card__flipside">
          <p>Alpha2Code</p>
          <p>{country.alpha2Code}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
