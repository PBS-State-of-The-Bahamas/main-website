import React from 'react'

type Props = {
    title: string,
    photoUrl: string
}

export default function ProgramCard({title, photoUrl}: Props) {
  return (
    <div className="rounded w-1/4 h-72 border-gray-2 border bg-gray-1">
        <div className="bg-gray-3 w-full h-5/6 rounded-t">{photoUrl}</div>
        <h5 className="text-heading-5 p-2">{title} </h5>
    </div>
  )
}