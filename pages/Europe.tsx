import React from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { CountryPage } from '../templates'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const Europe = (props: Props): JSX.Element => {
  return (
    <CountryPage title='Ye Olde Europe (before Brexit)' countries={props.countries} />
  )
}

Europe.getInitialProps = async () => {
  const countries = await countryService.getEUCountries()
  return { countries }
}

export default Europe
