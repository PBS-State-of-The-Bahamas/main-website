import React from 'react'
import { mainNav, renderNavigationLinks, subNav } from './data/pages';

type Props = {}

function Footer({}: Props) {
  return (
    <>
        <div className='bg-dark-royal-blue py-6'>
            <div className='mx-auto flex space-x-20 max-w-screen-2xl px-10'>
                <div>
                    <h6 className='text-heading-6 uppercase text-gray-1'>Menu</h6>
                    <ul className='text-gray-1 mt-3'>
                        {renderNavigationLinks(mainNav['main']).map((item, index)=> <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h6 className='text-heading-6 uppercase text-gray-1'>Chapters</h6>
                    <ul className='text-gray-1 mt-3 '>
                        {renderNavigationLinks(subNav).map((item, index)=> <li className='hover:text-gray-3'key={index}>{item}</li>) }
                    </ul>
                </div>
            </div>

        </div>
        <div className=' bg-royal-blue py-1 py-2'>
            <div className='text-gray-1 text-heading-6 flex mx-auto max-w-screen-2xl px-10'>
                <>© {new Date().getFullYear()} Phi Beta Sigma Bahamas. All rights reserved.</>
                <div className='ml-auto'>Privacy</div>
            </div>

        </div>

    </>
  )
}

export default Footer