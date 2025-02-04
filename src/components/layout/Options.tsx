import React from 'react'
import { Option } from './Option'

export const Options = () => {
  return (
    <>
    <div className="lg:flex lg:flex-col w-full lg:w-80 xl:w-[450px] gap-3 order-1 lg:order-2 mb-7 lg:mb-0 grid grid-cols-1 md:grid-cols-2">
        <Option index={0}/>
        <Option index={1}/>
        <Option index={2}/>
        <Option index={3}/>
    </div>
    </>
  )
}
