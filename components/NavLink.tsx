import React from 'react'
import Link from 'next/link'
import { Page } from '../constants'
import images from '../assets'

type Props = {
  alt: string;
  path: Page;
  text: string;
}

const NavLink = (props: Props) => {
  return (
    <Link href={props.path}>
      <div className='btn'>
        <a className='btn__text'>{props.text}</a>
        <img src={images.arrowRight} alt={props.alt} className='img'/>
      </div>
    </Link>
  )
}

export default NavLink
