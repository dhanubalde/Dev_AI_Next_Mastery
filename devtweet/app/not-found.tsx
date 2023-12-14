import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-full gap-2'>
      <h1 className='text-6xl font-bold'>Uh Oops ):</h1>
  
      <p className='text-2xl font-semibold'>404 Request Not Found</p>
      <Link href={`/`} className=' underline'>return to Home</Link>
    </div>
  )
}

export default Notfound