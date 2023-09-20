import React, { useState, useEffect } from 'react'
import { getMainLinks, getChapterPages } from './data/pages';
import PageLogo from './PageLogo';
import Container from '@/components/Container';
import TextField from '@/components/formElements/TextField';
import TextArea from '../formElements/TextArea';
import RadioButtons from '@/components/formElements/RadioButtons'
import * as Yup from 'yup'
import { useFormik } from "formik";
import {motion, AnimatePresence} from 'framer-motion'

export default function Navbar({currentUrl}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  useEffect(()=>{
    if (contactModalOpen && menuOpen) setMenuOpen(false)
  },[contactModalOpen])
  return (
    <>
    <div className='fixed w-full z-40'>
      <SubNavBar />
      <div className='bg-royal-blue py-2'>
      <AnimatePresence key={currentUrl}>
        <Container>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration: 0.25, delay: 1}}>
            <PageLogo />
          </motion.div>
          
          <motion.div className='md:flex items-center ml-auto hidden' 
          initial={{y: 25, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 0, opacity: 1}}
          transition={{duration: .5, delay: 0.75, type: 'spring'}}
          >
            {
              getMainLinks(currentUrl)
                .map((link, key) => <div key={key} className={`px-3 text-gray-1 hover:text-gray-3`}>{link}</div>)
            }
            <ContactButton setContactModalOpen={setContactModalOpen}/>
          </motion.div>
          <button className='ml-auto text-gray-1 sm:hidden' onClick={()=> setMenuOpen((menu)=> !menu )}>{menuOpen? <img src="/images/Cross.svg" alt="Hamburger Menu close" /> : <img src="/images/Menu.svg" alt="Hamburger menu open" />}</button>
        </Container>
        </AnimatePresence>
      </div>
      <div className={`hamburgerMenu ${!menuOpen && 'hidden'}`}>
        <div className={`rounded md:hidden bg-dark-royal-blue px-4 py-8 absolute w-full `}>
          {
            getMainLinks(currentUrl)
              .map((link, key) => <div key={key} className={`py-1 text-gray-1 hover:text-gray-3`}>{link}</div>)
          }
          <ContactButton setContactModalOpen={setContactModalOpen}/>
        </div>  
        <div className="overlay h-screen bg-gray-6/[.20]" onClick={()=>setMenuOpen(false)}></div>      
      </div>

    </div>
    <div className='h-20'>

    </div>
    <ContactModal setContactModalOpen={setContactModalOpen} contactModalOpen={contactModalOpen} />
    </>
  )
}

function SubNavBar() {
  return (
    <div className=' bg-dark-royal-blue py-1'>
      <Container>
      <div className='text-gray-1 text-sm flex'>
      {
        getChapterPages()
          .map((link, key)=> <div key={key} className={`px-2 text-gray-1 hover:text-gray-3`}>{link}</div>)
      }
      </div>
      </Container>
    </div>
  )
}


function ContactModal({setContactModalOpen, contactModalOpen}) {
  const MessageOptions = [
    {key: 'State (Overall)', value: 'state@sigmabahamas.com'},
    {key: 'Beta beta lambda (Undergrad - Nassau)', value: 'bbl@sigmabahamas.com'},
    {key: 'Delta epsilon sigma (Graduate - Nassau) ', value: 'des@sigmabahamas.com'},
    {key: 'omicron pi sigma (Undergrad - grand bahama ', value: 'ops@sigmabahamas.com'},
  ]
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      telephone: "",
      messageRecipient: MessageOptions[0].value
    },
    onSubmit: async (values) => {
      console.log(values)
  
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('How do we know who to reference?'),
      email: Yup.string()
        .email()
        .required('We need this to get back to you.'),
      message: Yup.string()
        .required('Your message is required and important for us.'),
    }),
  });


  function closeReset(e){
    formik.handleReset(e)
    setContactModalOpen(false)

  }
  return (
    <AnimatePresence>
      <motion.div layout layoutRoot className={`w-full h-full bg-gray-6/[.20] z-50 fixed inset-0 sm:pt-12 pt-4 ${!contactModalOpen && 'hidden'}`} onClick={e =>closeReset(e)}> 
        <motion.div layout='size' className={`bg-gray-1 rounded py-10 px-6 w-96 mx-auto relative max-w-[90%] overflow-y-auto max-h-screen`} onClick={e => e.stopPropagation()}
          initial={{y: 100, transformOrigin: 'center'}}
          animate={{y: 0}}
          exit={{y: -100}}
          transition={{duration: .5, type: 'spring'}}
          >
          <img src="/images/Cross.svg" alt="Contact Modal close" className='invert absolute top-2 right-2 hover' onClick={e => closeReset(e)}/>
          <h6 className='uppercase text-royal-blue text-heading-6'>Get in touch</h6>
          <h5 className='text-heading-5 text-gray-6 mb-2'>Phi Beta Sigma Bahamas</h5> 
          <form onSubmit={formik.handleSubmit}>
            <TextField for='name' label='Name' value={formik.values.name} onChange={formik.handleChange} errorMessage={formik.errors.name} onBlur={formik.handleBlur}/>
            <TextField for='email' label='Email Address' formType='email' value={formik.values.email} onChange={formik.handleChange} errorMessage={formik.errors.email} onBlur={formik.handleBlur}/>
            <TextField for='telephone' label='Telephone' value={formik.values.telephone} formType='tel' optional onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <TextArea for='message' label='Message' value={formik.values.message} onChange={formik.handleChange} errorMessage={formik.errors.message} onBlur={formik.handleBlur}/>
            <RadioButtons for='messageRecipient'label='I want to message:' options={MessageOptions} onChange={(e)=> formik.setFieldValue('messageRecipient', e.target.value)}/>
            <button type='submit' className='bg-royal-blue text-gray-1 uppercase w-full rounded py-2 mt-6 text-heading-6'>send message</button>
          </form>
        </motion.div>
        
      </motion.div>
    </AnimatePresence>

  )
}

function ContactButton({setContactModalOpen}) {
  return (
    <button className='text-royal-blue bg-gray-1 px-8 py-2 rounded text-heading-6 uppercase hover:text-dark-royal-blue hover:bg-gray-2 sm:ml-2 mt-2 sm:mt-0' onClick={()=> setContactModalOpen(true)}>Contact Us</button>
  )
}