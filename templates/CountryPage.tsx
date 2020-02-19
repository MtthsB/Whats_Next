import React, { useEffect, useRef, useState } from 'react'

import { Country } from '../models'
import { Layout, Spinner, Card, Popup } from '../components'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
  title: string;
}

const CountryPage = (props: Props): JSX.Element => {
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

  const closeModal = () => setSelection(null)

  const handleSelection = (index: number): void => setSelection(index)

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

  if (isLoading) {
    return (
      <Layout title={props.title}>
        <Spinner />
      </Layout>
    )
  } else {
    return (
      <Layout title={props.title}>
        <div className='scrollContainer' ref={scrollRef}>
          {countries.map((country, index) => <Card key={`${index}-${country.alpha2Code}`} country={country} index={index} handleClick={handleSelection} />)}
          {isFetching && <Spinner />}
        </div>
        {(!!selectedCountry || selectedCountry === 0) && <Popup handleClose={closeModal} data={countries[selectedCountry]} />}
      </Layout>
    )
  }
}

export default CountryPage
