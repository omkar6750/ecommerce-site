import Hero from '@/components/Hero'
import NewCollections from '@/components/NewCollections'
import Offers from '@/components/Offers'
import Popular from '@/components/Popular'
import React from 'react'

function Shop() {
  return (
    <div className='flex flex-col'>
      <Hero></Hero>
      {/* <Popular></Popular>
      <Offers></Offers>
      <NewCollections /> */}
    </div>
  )
}

export default Shop