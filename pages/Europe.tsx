import React from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { CountryList } from '../templates'

// styling
import '../styles/main.scss'
import { Layout } from '../components'

type Props = {
  countries: Country[];
}

const Europe = (props: Props): JSX.Element => {
  return (
    <Layout title='Ye Olde Europe (before Brexit)'>
      <CountryList countries={props.countries} />
    </Layout>
  )
}

Europe.getInitialProps = async () => {
  const countries = await countryService.getEUCountries()
  return { countries }
}

export default Europe
