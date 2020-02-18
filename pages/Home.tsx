import React from 'react'

import { NavLink, Layout } from '../components'
import { Page } from '../constants'

// styling
import '../styles/main.scss'

const Home = () => {
  return (
    <Layout title={'What\'s next?'}>
      <NavLink alt='See Countries' path={Page.World} text='See a list of countries around the world' />
      <NavLink alt='See Countries' path={Page.Europe} text='See a list of European countries' />
      <NavLink alt='See Countries' path={Page.Search} text='Search countries' />
    </Layout>
  )
}

export default Home
