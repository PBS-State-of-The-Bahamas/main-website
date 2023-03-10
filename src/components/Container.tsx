import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-screen-2xl px-4 md:px-10 mx-auto flex'>
        {children}
    </div>
  )
}

export default Container