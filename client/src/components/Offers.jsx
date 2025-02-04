import React from 'react'
import { Button } from './ui/button'
import exclusive_image from '../assets/Frontend_Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='flex justify-center items-center w-full h-[100vh] px-0 pb-36  '>
      <div className='w-4/5 h-[60vh] flex bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] pl-40'>
        <div className='flex-1 flex flex-col justify-center '>
            <h1 className='text-7xl font-semibold text-slate-900 mb-4 '>EXCLUSIVE</h1>
            <h1 className='text-5xl font-bold text-slate-800 mb-6'>OFFERS FOR YOU</h1>
            <p className='text-2xl font-semibold'>Only on bestseller product's</p>
            <Button className='w-72 h-20 rounded-full bg-red-600 border-none text-white text-2xl font-medium cursor-pointer mt-8'>Check Now</Button>
        </div>
        <div className='flex flex-1 items-center justify-end pt-12 '>
          <img src={exclusive_image} alt="" className='h-[60vh]' />
        </div>
      </div>
    </div>
  )
}

export default Offers