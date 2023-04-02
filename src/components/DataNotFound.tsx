import React from 'react'
import PageTemplate from './PageTemplate'
import Section from './Section'
import Link from 'next/link'

type Props = {}

const DataNotFound = (props: Props) => {
  return (
    <PageTemplate>
        <Section>
            <div className='min-h-[63vh]'>
               <h4 className='text-heading-4 text-gray-6'>This is an empty space</h4>
                <p className='text-gray-5'>We are currently working on adding information to this page for you.</p>
                <Link href='/'><button className="cursor-pointer text-heading-6 bg-royal-blue text-gray-1 py-3 px-6 rounded mt-6 uppercase">Back to homepage</button></Link>
            
            </div>
        </Section>
    </PageTemplate>
  )
}

export default DataNotFound