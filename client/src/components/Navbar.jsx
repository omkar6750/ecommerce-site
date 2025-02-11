import React, { useState } from 'react'
import logo from '../assets/Frontend_Assets/logo/logo.png'
import { ShoppingCart } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '@/Store'


function Navbar() {
    const {cart} = useAppStore()
    const location = useLocation();
    const menu = location.pathname;
    
    return (
    <div className='flex justify-around border-b-2 p-4'>
        <div  className=' flex items-center '>
            <img src={logo} alt="" />
            <p className='text-3xl text-[#171717] font-semibold px-2'>AEON</p>
        </div>
        <ul className='justify-around w-80 items-center flex list-none '>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            >
                <Link to={'/'}>Shop</Link> 
                {menu === '/'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>):<></>}
            </li>
            
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            >
                <Link to={'/mens'}>Mens</Link> 
                {menu === '/mens'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600 '/>):<></>}
            </li>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            >
                <Link to={'/womens'}>Womens</Link> 
                {menu === '/womens'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>):<></>}
            </li>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            
            >
                <Link to={'/kids'}>Kids</Link> 
                {menu === '/kids'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>): <></>}
            </li>
        </ul>
        <div className='flex justify-center items-center gap-5'>
            <Link to={'/auth'}>
            <button className='border-[1px] rounded-full text-2xl text-center text-gray-600 h-16 w-44 cursor-pointer active:bg-slate-100/25'>Login</button>
            </Link>
            <Link to={'/cart'}><ShoppingCart className=' cursor-pointer' size={35} /></Link>
            <div className='w-5 h-5 mb-8 text-center text-sm -ml-7 text-white rounded-full bg-red-700 '>{cart.length}</div>
        </div>
    </div>
  )
}

export default Navbar
