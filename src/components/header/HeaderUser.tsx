'use client'
import { useClickOutside } from '@/hooks';
import Image from 'next/image';
import React from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { RiMenuLine } from 'react-icons/ri';
import { Menu } from './Menu';

interface Props{
    image?: string;
    name: string;
};


export const HeaderUser = ({ image = "/images/User_image_default.png", name = "" }: Props) => {

    const { isOpen, menuRef, setIsOpen } = useClickOutside();

  return (
    <div ref={ menuRef } onClick={ () => setIsOpen(!isOpen) } className="flex items-center gap-1 cursor-pointer relative">
      <Image
        src={ image }
        alt={`User Image ${ process.env.NEXT_PUBLIC_APP_NAME }`}
        width={1000}
        height={1000}
        className="rounded-full w-10 h-10 object-contain bg-white"
      />
      <span className="hidden lg:block">{ name.length > 14 ? name.slice(0,14) + '...' : name }</span>

      <button className={`${ isOpen ? 'rotate-180' : 'rotate-360' } transition-all text-lg lg:flex items-center justify-center hidden`}>
        <FiChevronDown/>
      </button>
      <button className="text-2xl ms-2 flex lg:hidden">
        <RiMenuLine />
      </button>

      <Menu isOpen={ isOpen }/>
    </div>
  )
}
