import React from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { CountryList } from '../templates'
import { Layout, Popup } from '../components'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
  hasError: boolean;
}

const World = (props: Props): JSX.Element => {
  const handleClosePopup = () => window.location.reload()

  return (
    <Layout title='See the world'>
      {props.hasError ? <Popup hasError handleClose={handleClosePopup} /> : <CountryList countries={props.countries} />}
    </Layout>
  )
}

World.getInitialProps = async () => {
  try {
    const countries = await countryService.getCountries()
    return { hasError: false, countries }
  } catch (e) {
    return { hasError: true, countries: null }
  }
}

export default World
