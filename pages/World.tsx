import React, { useEffect, useRef, useState } from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { Layout, Spinner, Popup, Card } from '../components'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const World = (props: Props): JSX.Element => {
  const [ countries, updateCountries ] = useState<Country[]>(props.countries.slice(0, 20))
  const [ loadPosition, updateLoadPosition ] = useState<number>(10)
  const [isLoading, toggleLoading] = useState<boolean>(true)
  const [isFetching, toggleFetching] = useState<boolean>(false)
  const [ selectedCountry, setSelection ] = useState<number>(null)

  const scrollOffset = 300
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    if (props.countries) {
      // Just fake some initial loading state
      setTimeout(() => {
        toggleLoading(false)
      }, 1000)
    }

    return () => window.removeEventListener('scroll', onScroll)
  })

  const onScroll = () => {
    if ((window.scrollY + window.innerHeight >= scrollRef.current.scrollHeight - scrollOffset) && (countries.length < props.countries.length)) {
      toggleFetching(true)

      const amountToLoad = (props.countries.length - countries.length < 10) ? (props.countries.length - countries.length) : 10

      // Just fake some loading state
      setTimeout(() => {
        updateCountries(countries.concat(props.countries.slice(loadPosition, loadPosition + amountToLoad)))
        updateLoadPosition(loadPosition + 10)
        toggleFetching(false)
      }, 1000)
    }
  }

  const handleSelection = (index: number): void => setSelection(index)

  if (isLoading) {
    return (
      <Layout title="See the World">
        <Spinner />
      </Layout>
    )
  } else {
    return (
      <Layout title="See the World">
        <div className='scrollContainer' ref={scrollRef}>
          {countries.map((country, index) => <Card key={`${index}-${country.alpha2Code}`} country={country} index={index} handleClick={handleSelection} />)}
          {isFetching && <Spinner />}
        </div>
        {(!!selectedCountry || selectedCountry === 0) && <Popup data={countries[selectedCountry]} />}
      </Layout>
    )
  }
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
