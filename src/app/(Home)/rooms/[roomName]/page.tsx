import React from 'react'

type Props = {
    params:{roomName:string}
}

export default function page({params}:Props) {
    console.log(params)
  return (
    <div>page</div>
  )
}
