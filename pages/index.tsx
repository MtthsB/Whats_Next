import React from 'react'

// styling
import '../styles/main.scss'
import { Page } from '../constants'
import { NavLink } from '../components'

const Home = (): JSX.Element => {
  return (
    <div className='home__root'>
      <h1 className='home__title'>What's Next?</h1>
      <div className='home__body'>
        <NavLink alt='See Countries' path={Page.Overview} text='See a list of countries' />
        <NavLink alt='See Countries' path={Page.Europe} text='See a list of European countries' />
        <NavLink alt='See Countries' path={Page.Search} text='Search countries' />
      </div>
    </div>
  )
}

export default Home
