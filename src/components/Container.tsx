import React from 'react'

type Props = {}

function Container({children}) {
  return (
    <div className='max-w-screen-2xl px-10 mx-auto flex'>
        {children}
    </div>
  )
}

export default Container