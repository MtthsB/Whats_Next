import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'

import * as countryService from '../services/countryService'
import { Country } from '../models'
import { Layout } from '../components'
import { useInterval } from '../hooks'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const World = (props: Props): JSX.Element => {
  const [ countries, updateCountries ] = useState<Country[]>(props.countries.slice(0, 20))
  const [ loadPosition, updateLoadPosition ] = useState<number>(10)
  const [ isLoading, toggleLoading ] = useState<boolean>(true)
  const [ isFetching, toggleFetching ] = useState<boolean>(false)

  const [ toRender, updateToRender ] = useState<Country[]>(null)

  const scrollOffset = 100
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
  }, [])

  useInterval(() => {
    const countryArray = countries
    const country = countryArray.pop()
    if (country) {
      toRender ? updateToRender([...toRender, country]) : updateToRender([ country ])
    }
  }, 500)

  // useEffect(() => {
  //   if (!isLoading && !isFetching) {
  //     const timerHandle = setInterval(() => {
  //       const countryArray = [ ...countries ]

  //       const country = countryArray.pop()
  //       if (country) {
  //         toRender ? updateToRender([...toRender, country]) : updateToRender([ country ])
  //       } else {
  //         return () => clearInterval(timerHandle)
  //       }
  //     })
  //   }
  // }, [isLoading, isFetching, countries])

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

  const renderRow = (country: Country, index: number): JSX.Element => {
    const className = classnames('card visible')

    return (
      <div className={className} key={`${index}-${country.alpha2Code}`}>
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
          {toRender && toRender.map(renderRow)}
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
