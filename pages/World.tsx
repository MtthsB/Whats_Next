import React, { useEffect, useState } from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { Layout } from '../components'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const World = (props: Props): JSX.Element => {
  const [ countries, updateCountries ] = useState<Country[]>(props.countries)
  const [isLoading, toggleLoading] = useState<boolean>(true)

  useEffect(() => {
    if (props.countries) toggleLoading(!isLoading)
  }, [countries])

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  const renderRow = (country: Country, index: number): JSX.Element => {
    return (
      <div className="card" key={index}>
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

  return (
    <Layout title="See the World">
      {countries.slice(0, 10).map(renderRow)}
    </Layout>
  )
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
