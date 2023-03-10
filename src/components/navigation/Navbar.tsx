import React, { useState } from 'react'
import { mainNav, subNav, renderNavigationLinks } from './data/pages';
import PageLogo from './PageLogo';
import Container from '@/components/Container';

type Props = {
  type?: string;
}

export default function Navbar({type = 'main'}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
    <div className='fixed w-full'>
      <SubNavBar />
      <div className='bg-royal-blue py-2'>
        <Container>
          <PageLogo />
          <div className='md:flex items-center ml-auto hidden'>
            {
              renderNavigationLinks(mainNav[type])
                .map((link, key) => <div key={key} className={`px-3 text-gray-1 hover:text-gray-3`}>{link}</div>)
            }
            <button className='text-royal-blue bg-gray-1 px-8 py-2 rounded text-heading-6 uppercase hover:text-dark-royal-blue hover:bg-gray-2 ml-2'>Contact Us</button>
          </div>
          <button className='ml-auto text-gray-1 sm:hidden' onClick={()=> setMenuOpen((menu)=> !menu )}>{menuOpen? <img src="/images/Cross.svg" alt="Hamburger Menu close" /> : <img src="/images/Menu.svg" alt="Hamburger menu open" />}</button>
        </Container>

      </div>
      <div className={`hamburgerMenu ${!menuOpen && 'hidden'}`}>
        <div className={`rounded md:hidden bg-dark-royal-blue px-4 py-8 absolute w-full `}>
          {
            renderNavigationLinks(mainNav[type])
              .map((link, key) => <div key={key} className={`py-1 text-gray-1 hover:text-gray-3`}>{link}</div>)
          }
          <button className='text-royal-blue bg-gray-1 px-8 py-2 rounded text-heading-6 uppercase hover:text-dark-royal-blue hover:bg-gray-2 mt-4'>Contact Us</button>
          
        </div>  
        <div className="overlay h-screen bg-gray-6/[.20]" onClick={()=>setMenuOpen(false)}></div>      
      </div>

    </div>
    <div className='h-20'>

    </div>
    </>
  )
}

function SubNavBar() {
  return (
    <div className=' bg-dark-royal-blue py-1'>
      <Container>
      <div className='text-gray-1 text-sm flex'>
      {
        renderNavigationLinks(subNav)
          .map((link, key)=> <div key={key} className={`px-2 text-gray-1 hover:text-gray-3`}>{link}</div>)
      }
      </div>
      </Container>
    </div>
  )
}
