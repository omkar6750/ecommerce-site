import React from 'react'
import footer_logo from '../assets/Frontend_Assets/logo_big.png'
import instagram_icon from '../assets/Frontend_Assets/instagram_icon.png'
import pinterest_icon from '../assets/Frontend_Assets/pinterest_icon.png'
import whatsapp_icon from '../assets/Frontend_Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-12'>
        <div className='flex gap-5 items-center'>
            <img src={footer_logo} alt="" />
            <p className='text-slate-800 font-semibold text-5xl  '>AEON</p>
        </div>
        <ul className='flex list-none gap-12 text-slate-800 text-xl'>
            <li className='flex gap-5'>Company</li>
            <li className='flex gap-5 '>Products</li>
            <li className='flex gap-5 '>Offices</li>
            <li className='flex gap-5 '>About</li>
            <li className='flex gap-5 '>Contact</li>
        </ul>
        <div className='flex gap-5'>
            <div className='p-3 pb-2 bg-[#fbfbfb] border-solid  border-[1px] border-[#ebebeb] rounded-md '>
                <img src={instagram_icon} alt="" />
            </div>
            <div className='p-3 pb-2 bg-[#fbfbfb] border-solid  border-[1px] border-[#ebebeb] rounded-md '>
                <img src={pinterest_icon} alt="" />
            </div>
            <div className='p-3 pb-2 bg-[#fbfbfb] border-solid border-[1px] border-[#ebebeb] rounded-md '>
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
            <div>
                <hr />
                <p>Copyright @ 2025 -All rights reserved</p>
            </div>
        
    </div>
  )
}

export default Footer