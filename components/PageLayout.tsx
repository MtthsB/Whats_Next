import React, { ReactNode } from 'react'

type Props = {
  title: string;
  children?: ReactNode;
}
export default (props: Props) => {
  return (
    <div className='layout__root'>
      <h1 className='layout__title'>{props.title}</h1>
      <div className='layout__body'>
        {props.children}
      </div>
    </div>
  )
}
