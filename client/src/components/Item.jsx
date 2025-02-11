import { HOST } from '@/Utils/constants'
import React from 'react'

const Item = (props) => {
  return (
    <div className='w-96 hover:translate-x-3 hover:-translate-y-3 duration-300'>
        <img src={`${HOST}/uploads/${props.product_image}`} alt="" className='object-cover' />
        <p className='mt-2' >{props.name}</p>
        <div className='flex gap-5'>
            <div className='text-slate-800 font-semibold text-xl'>
                {props.new_price}
            </div>
            <div className='text-slate-800 text-xl line-through font-medium'>
                {props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item