import React from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { CountryPage } from '../templates'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const World = (props: Props): JSX.Element => {
  return (
    <CountryPage title='See the world' countries={props.countries} />
  )
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
