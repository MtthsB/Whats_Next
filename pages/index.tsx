import React from 'react'
import Link from 'next/link'

// styling
import '../styles/main.scss'
import { Page } from '../constants'

const Home = (): JSX.Element => {
  return (
    <div>
      {/* eslint-disable-next-line */}
      <h1 className='home__title'>What's Next?</h1>
      <Link href={Page.Overview}>
        <a>See a list of countries</a>
      </Link>
      <Link href={Page.Europe}>
        <a>See a list of European countries</a>
      </Link>
      <Link href={Page.Search}>
        <a>Search for countries</a>
      </Link>
    </div>
  )
}

export default Home
