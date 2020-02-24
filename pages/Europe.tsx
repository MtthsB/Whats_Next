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

const Europe = (props: Props): JSX.Element => {
  const handleClosePopup = () => window.location.reload()

  return (
    <Layout title='Ye Olde Europe (before Brexit)'>
      {props.hasError ? <Popup hasError handleClose={handleClosePopup} /> : <CountryList countries={props.countries} />}
    </Layout>
  )
}

Europe.getInitialProps = async () => {
  try {
    const countries = await countryService.getEUCountries()
    return { hasError: false, countries }
  } catch (e) {
    return { hasError: true, countries: null }
  }
}

export default Europe
