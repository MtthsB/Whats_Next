import React, { useEffect, useRef, useState } from 'react'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { Layout } from '../components'

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

  const scrollOffset = 200
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

      // Just fake some loading state
      setTimeout(() => {
        updateCountries(countries.concat(props.countries.slice(loadPosition, loadPosition + 10)))
        updateLoadPosition(loadPosition + 10)
        toggleFetching(false)
      }, 1000)
    }
  }

  const renderRow = (country: Country, index: number): JSX.Element => {
    return (
      <div className="card" key={index}>
        <p className="card__row card__row--front">{country.name}</p>
        <div className="card__row card__row--back">
          <div className="card__flipside">
            <p>Name</p>
            <p>{country.name}</p>
          </div>
          <div className="card__flipside">
            <p>Capital</p>
            <p>{country.capital}</p>
          </div>
          <div className="card__flipside">
            <p>Alpha2Code</p>
            <p>{country.alpha2Code}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Layout title="See the World">
        <h1>Loading...</h1>
      </Layout>
    )
  } else {
    return (
      <Layout title="See the World">
        <div className='scrollContainer' ref={scrollRef}>
          {countries.map(renderRow)}
          {isFetching && <h1>Loading...</h1>}
        </div>
      </Layout>
    )
  }
}

World.getInitialProps = async () => {
  const countries = await countryService.getCountries()
  return { countries }
}

export default World
