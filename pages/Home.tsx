import React from 'react'

import { NavLink } from '../components'
import { Page } from '../constants'

// styling
import '../styles/main.scss'

const Home = () => {
  return (
    <div className='home__root'>
      <h1 className='home__title'>What's Next?</h1>
      <div className='home__body'>
        <NavLink alt='See Countries' path={Page.World} text='See a list of countries around the world' />
        <NavLink alt='See Countries' path={Page.Europe} text='See a list of European countries' />
        <NavLink alt='See Countries' path={Page.Search} text='Search countries' />
      </div>
    </div>
  )
}

export default Home
