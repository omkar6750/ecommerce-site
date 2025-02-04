import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React from 'react'

function Home() {
  return (
    <div className='flex justify-center items-center h-[200vh] w-full overflow-y-hidden'>
      <div className='fixed top-0 w-full'> <Navbar /></div>
    </div>
  )
}

export default Home