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

const World = (props: Props): JSX.Element => {
  return (
    <Layout title='See the world'>
      <CountryList countries={props.countries} />
    </Layout>
  )
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
