import React from 'react'
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

function PageTemplate({children, pageType='main'}) {
  return (
    <> 
        <Navbar type={pageType}/>
            <main className='max-w-screen-2xl px-10 mx-auto flex'>{children}</main>
        <Footer />
    </>
  )
}

export default PageTemplate