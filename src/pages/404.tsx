import Link from 'next/link'
import Navbar  from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Section from '@/components/Section';

export default function FourOhFour() {
  return <div className='h-screen'>
    <Navbar />
    <div className="min-h-[75%] bg-gray-0">
        <Section>
          <div className='flex flex-col text-center w-full relative'>
            <h2 className='text-gray-6 text-[80px] leading-[80px] font-bold'>404</h2>
            <h3 className="text-heading-4">You might be lost</h3>
            <p className='text-gray-5'>This page does not exist or was removed. Let&apos;s go back home.</p>
            <Link href='/'><button className="cursor-pointer text-heading-6 bg-royal-blue text-gray-1 py-3 px-6 rounded mt-6 uppercase">Back to homepage</button></Link>
          </div>
        </Section>
    </div>
  <Footer />
  </div>
}