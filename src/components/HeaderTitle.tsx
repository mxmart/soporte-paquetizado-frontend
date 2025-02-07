import Image from 'next/image';
import React from 'react'

interface Props {
    title: string;
    image?: string;
    cut?: boolean;
}

export const HeaderTitle = ({ title = 'Titulo del dashboard', image = '', cut = false }: Props) => {

    return (
        <>
            <div className={`flex items-center w-full h-20 box rounded-xl mb-4 headerTitle `}>
                <div className='flex items-center md:justify-between justify-center ms-6 mr-6 w-full'>
                    <p className="text-xl font-semibold text-center">{ cut && title.length > 21 ? title.substring(0,25)+"..." : title }</p>
                    <div className=" h-20 w-20 rounded-lg logo md:flex flex-wrap items-center justify-center py-1 hidden">
                        {
                            image && (
                            <Image
                                src={ image || '/images/Logo_image_default.png' }
                                width={ image ? 70 : 100 }
                                height={ image ? 70 : 100 }
                                alt='Logo empresa Mxmart Solutions'
                                className='rounded-lg object-contain object-center w-full h-full'
                            />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}