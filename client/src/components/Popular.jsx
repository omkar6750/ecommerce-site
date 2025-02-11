import React from 'react'
import Item from './Item'

const Popular = () => {
  return (
    <div className='flex flex-col h-5/6 items-center gap-3 w-full'>
        <h1 className='text-slate-900 font-semibold text-5xl mt-10'>POPULAR IN WOMEN'S</h1>
        <hr className='w-52 h-1 rounded-xl bg-[#252525]'/> 
        <div className='mt-12 flex gap-8'>
            {data_product.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular