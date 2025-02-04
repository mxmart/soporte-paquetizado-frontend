'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react'

interface Props {
    icon?: ReactNode;
    title?: string;
    responsiveTitle?: string;
    url?: string;
    index: number;
    callback?: () => void;
};

const sticky: { [key: number]: string } = {
    0: 'top-[140px]',
    1: 'top-[212px]',
    2: 'top-[284px]',
    3: 'top-[356px]',
};

export const Option = ({ icon, title, url, responsiveTitle, index, callback }: Props) => {
  return (
    <Link 
      className={`option h-[70px] lg:h-[60px] p-2 pl-4 rounded-lg w-full flex items-center justify-center lg:sticky ${ sticky[index] }`}
      href={ url || '/' }
    >
        <div className='w-8 h-8 flex items-center justify-center text-xl rounded-full mr-3 icon'>
            { icon }
        </div>
        <div className='flex flex-row items-center justify-center text-[13px] mr-auto'>
          <span className='font-semibold hidden md:flex lg:hidden xl:flex'>{ title }</span>
          <span className='font-semibold text-xs flex md:hidden lg:flex xl:hidden'>{ responsiveTitle }</span>
        </div>
    </Link>
  )
}
