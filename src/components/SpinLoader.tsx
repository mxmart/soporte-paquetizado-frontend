import React from 'react'

interface Props {
    width?: string;
    height?: string;
    color?: string;
    text?: boolean
};

export const SpinLoader = ({ color, height, width, text = true }: Props) => {
  return (
    <span className='text-white text-center flex items-center justify-center gap-x-2 text-xs'>
        <div className={`${ color } ${ height } ${ width } h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4`}></div>
        { text && <h1 className='text-white'>Cargando...</h1> }
    </span>
    
  )
}
