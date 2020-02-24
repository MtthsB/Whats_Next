import React, { useEffect, useCallback, useRef, useState } from 'react'

import { Country } from '../models'
import { Spinner, Card, Popup } from '../components'
import { useInterval } from '../hooks'

// styling
import '../styles/main.scss'

type Props = {
  countries: Country[];
}

const CountryPage = (props: Props): JSX.Element => {
  const [ countries, updateCountries ] = useState<Country[]>(props.countries.slice(0, 20))
  const [ loadPosition, updateLoadPosition ] = useState<number>(10)
  const [ amountLoaded, setAmountLoaded ] = useState<number>(null)
  const [ isLoading, toggleLoading ] = useState<boolean>(true)
  const [ isFetching, toggleFetching ] = useState<boolean>(false)
  const [ selectedCountry, setSelection ] = useState<number>(null)

  const [ toRender, updateToRender ] = useState<Country[]>(null)

  const scrollOffset = 100
  const scrollRef = useRef<HTMLDivElement>(null)
  const renderedList = useRef<Country[]>(null)

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

  useCallback(() => {
    if (toRender) {
      renderedList.current = toRender
      updateToRender(null)
    }

    useInterval(() => {
      const loadStart = amountLoaded ? countries.length - amountLoaded : 0
      const countryArray = countries.slice(loadStart, countries.length)
      const country = countryArray.pop()
      if (country) {
        toRender ? updateToRender([...toRender, country]) : updateToRender([ country ])
      }
    }, 500)
  }, [amountLoaded])

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

  const closeModal = () => setSelection(null)

  const handleSelection = (index: number): void => setSelection(index)

  const onScroll = () => {
    if ((window.scrollY + window.innerHeight >= scrollRef.current.scrollHeight - scrollOffset) && (countries.length < props.countries.length)) {
      toggleFetching(true)

      const amountToLoad = (props.countries.length - countries.length < 10) ? (props.countries.length - countries.length) : 10
      setAmountLoaded(amountToLoad)

      // Just fake some loading state
      setTimeout(() => {
        updateCountries(countries.concat(props.countries.slice(loadPosition, loadPosition + amountToLoad)))
        updateLoadPosition(loadPosition + 10)
        toggleFetching(false)
      }, 1000)
    }
  }

  const renderRow = (country: Country, index: number) => <Card key={`${index}-${country.alpha2Code}`} country={country} index={index} handleClick={handleSelection} />

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <div className='container' >
        <div className='container__scroll' ref={scrollRef}>
          {renderedList.current && renderedList.current.map(renderRow)}
          {toRender && toRender.map(renderRow)}
          {isFetching && <Spinner />}
        </div>
        {(!!selectedCountry || selectedCountry === 0) && <Popup handleClose={closeModal} data={countries[selectedCountry]} />}
      </div>
    )
  }
}

export default CountryPage
