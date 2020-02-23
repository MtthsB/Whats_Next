import React, { useState, useEffect } from 'react'

import { Layout, Input, Spinner, Popup } from '../components'
import * as countryService from '../services/countryService'
import { Country } from '../models'
import { CountryList } from '../templates'

// styling
import '../styles/main.scss'

export default () => {
  const [isLoading, toggleLoading] = useState<boolean>(false)
  const [results, setResults] = useState<Country[]>(null)
  const [hasError, toggleError] = useState<boolean>(false)

  useEffect(() => {
    if (results) {
      setTimeout(() => {
        toggleLoading(false)
      }, 1000)
    }
  }, [results])

  const closePopup = () => toggleError(false)

  const handleInput = async (input: string) => {
    toggleLoading(true)
    try {
      const data = await countryService.getCountryByName(input)
      setResults(data)
    } catch (e) {
      setResults(null)
      toggleLoading(false)
      toggleError(true)
    }
  }

  return (
    <Layout title='Search for a country'>
      <Input handleInput={handleInput} placeholder='What country are you interested in?' />
      {hasError && <Popup hasError handleClose={closePopup} />}
      {isLoading && <Spinner />}
      {!isLoading && results && <CountryList countries={results} />}
    </Layout>
  )
}
