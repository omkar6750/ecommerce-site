import React, { useState } from 'react'
import logo from '../assets/Frontend_Assets/logo.png'
import cart_icon from '../assets/Frontend_Assets/cart_icon.png'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppStore } from '@/Store'


function Navbar() {
    const [menu, setMenu] = useState('shop')
    const {cart} = useAppStore()
  return (
    <div className='flex justify-around border-b-2 p-4'>
        <div  className=' flex items-center '>
            <img src={logo} alt="" />
            <p className='text-3xl text-[#171717] font-semibold px-2'>AEON</p>
        </div>
        <ul className='justify-around w-80 items-center flex list-none '>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            onClick={() => setMenu('shop')}
            >
                <Link to={'/'}>Shop</Link> 
                {menu === 'shop'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>):<></>}
            </li>
            
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            onClick={() => setMenu('mens')}
            >
                <Link to={'/mens'}>Mens</Link> 
                {menu === 'mens'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600 '/>):<></>}
            </li>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            onClick={() => setMenu('womens')}
            >
                <Link to={'/womens'}>Womens</Link> 
                {menu === 'womens'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>):<></>}
            </li>
            <li 
            className='flex flex-col items-center justify-center text-xl text-gray-600 cursor-pointer '
            onClick={() => setMenu('kids')}
            >
                <Link to={'/kids'}>Kids</Link> 
                {menu === 'kids'? (<hr className='w-16 h-1 my-2 rounded-full bg-red-600'/>): <></>}
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
