import React, { useEffect, useState } from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const World = (props: Props) => {
  const [isLoading, toggleLoading] = useState<boolean>(true)

  useEffect(() => {
    if (props.countries) toggleLoading(!isLoading)
  }, [props])

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <ul>
      {props.countries.map((country, index) => <li key={index}>{country.name}</li>)}
    </ul>
  )
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
