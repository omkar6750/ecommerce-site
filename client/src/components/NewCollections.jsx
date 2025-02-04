import React from 'react'
import new_collections from '@/assets/Frontend_Assets/new_collections'
import Item from './Item'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from './ui/card'

const NewCollections = () => {
  return (
    <div className='flex flex-col h-5/6 items-center gap-3 w-full'>
        <h1 className='text-slate-900 font-semibold text-5xl mt-10'>NEW COLLECTIONS</h1>
        <hr className='w-52 h-1 rounded-xl bg-[#252525]'/>
        <div className='mt-12 flex gap-8'>
            {/* {new_collections.map((item, i) => {
                return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price} />
            })} */}
            {/* <Carousel 
                plugins={[
                    Autoplay({
                    delay: 2000,
                    }),
                ]}>
                <CarouselContent>

                </CarouselContent>
            </Carousel> */}
            <Carousel
            opts={{
              align: "start",
            }}
            plugins={[
              Autoplay({
              delay: 2000,
              }),
            ]}
            className="w-full max-w-7xl"
          >
            <CarouselContent>
              {new_collections.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Item
                          id={item.id}
                          image={item.image}
                          name={item.name}
                          old_price={item.old_price}
                          new_price={item.new_price}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
    </div>
  )
}

export default NewCollections