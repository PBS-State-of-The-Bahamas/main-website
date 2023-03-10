import React from 'react'
import { mainNav, renderNavigationLinks, subNav } from './data/pages';
import Container from '../Container';

type Props = {}

function Footer({}: Props) {
  return (
    <>
        <div className='bg-dark-royal-blue py-6'>
            <Container>
            <div className='flex space-x-20'>
                
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
            </Container>

        </div>
        <div className='bg-royal-blue py-2 text-gray-1 text-heading-6'>
            <Container>
                <div className='flex-col sm:flex-row flex w-full'>
                <>© {new Date().getFullYear()} Phi Beta Sigma Bahamas. All rights reserved.</>
                <div className='sm:ml-auto mt-2'>Privacy</div>
                </div>
            </Container>

        </div>

    </>
  )
}

export default Footer