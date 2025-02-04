import React from 'react'
import hero_image from '../assets/Frontend_Assets/hero_image.png'
import handIcon from '../assets/Frontend_Assets/hand_icon.png'
import { ArrowRightIcon } from 'lucide-react'

const Hero = () => {
  return (
    <div className='h-[90vh] flex bg-gradient-to-bl from-[#fde1ff] to-[#e1ffea22] '>
        <div className='flex-1 flex flex-col justify-center gap-[20px] pl-[180px] leading-tight'>
            <h2 className='text-slate-900 text-2xl font-semibold'>NEW ARRIVALS ONLY</h2>
            <div>
                <div className='flex gap-5 items-center'>
                    <p className='text-8xl font-bold text-slate-900'>New</p>
                    <img src={handIcon} alt="" className='w-24' />
                </div>
                <p className='text-8xl font-bold text-slate-900'>collections</p>
                <p className='text-8xl font-bold text-slate-900'>for everyone</p>
            </div>
            <div>
                <div className='flex items-center justify-center gap-4 w-96 h-16 rounded-full text-white font-semibold text-xl bg-red-600'>Latest Collection</div>
                <img src={ArrowRightIcon} alt="" />
            </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
            <img src={hero_image} alt="" className='h-[90vh]'/>
        </div>
    </div>
  )
}

export default Hero