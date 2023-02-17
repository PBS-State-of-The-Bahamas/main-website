import React from 'react'
import Link from 'next/link';
type Props = {}

function PageLogo() {
  return (
    <Link href='/'>
      <img src='/images/PBSLogo.png' alt='Phi Beta Sigma Logo' className='h-11'/>
    </Link>
  )
}

export default PageLogo