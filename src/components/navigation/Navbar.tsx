import React from 'react'
import { mainNav, subNav, renderNavigationLinks } from './data/pages';
import PageLogo from './PageLogo';

type Props = {
  type?: string;
}

export default function Navbar({type = 'main'}: Props) {
  return (
    <>
      <SubNavBar />
      <div className='flex bg-royal-blue w-100 h-12 items-center'>
        <PageLogo />
        <div className='flex items-center ml-auto'>
          {
            renderNavigationLinks(mainNav[type])
              .map((link, key) => <div key={key} className={`px-3 text-gray-1 hover:text-gray-3`}>{link}</div>)
          }
          <button className='text-royal-blue bg-gray-1 px-8 py-2 rounded text-heading-6 uppercase hover:text-dark-royal-blue hover:bg-gray-2'>Contact Us</button>
        </div>
      </div>
    </>
  )
}

function SubNavBar() {
  return (
    <div className='flex bg-dark-royal-blue text-gray-1 text-sm'>
      {
        renderNavigationLinks(subNav)
          .map((link, key)=> <div key={key} className={`px-2 text-gray-1 hover:text-gray-3`}>{link}</div>)
      }
    </div>
  )
}