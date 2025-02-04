import Image from 'next/image';
import React from 'react'

interface Props {
    userImage?: string;
    title: string;
}; 

export const DashboardTitle = ({ userImage, title = "Titulo del dashboard" }: Props) => {
  return (
    <>
    <div className="flex justify-center items-center md:justify-start w-full h-20 px-6 pb-4 dashboard-title">
        <div className='flex items-center mt-5'>
            {
                userImage && (
                    <Image 
                        src={ userImage } 
                        alt={`User Image ${ process.env.NEXT_PUBLIC_APP_NAME }`} 
                        width={ 40 } 
                        height={ 40 } 
                        className='rounded-full mr-2 hidden md:block'
                    />
                )
            }
            <p className="text-2xl font-medium text-center">{ title }</p>
        </div>
    </div>
    <hr className="mb-7 border-t"/>
    </>
  )
}
