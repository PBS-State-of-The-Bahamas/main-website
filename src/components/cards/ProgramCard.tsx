import React from 'react'

type Props = {
    title: string,
    photoUrl: string
}

export default function ProgramCard({title, photoUrl}: Props) {
  return (
    <div className=" flex-1 rounded my-2 lg:my-0 grow h-72 border-gray-2 border bg-gray-1">
        <div className={`${!photoUrl && 'bg-[#F0F0F0]'} w-full h-5/6 rounded-t overflow-hidden`}><img src={photoUrl || '/images/empty.png'} alt={title} className='mx-auto w-full h-full object-fit '/></div>
        <h5 className="text-heading-5 p-2">{title} </h5>
    </div>
  )
}