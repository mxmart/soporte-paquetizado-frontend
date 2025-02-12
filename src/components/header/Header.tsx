'use client';
import React from 'react'
import { HeaderUser } from './HeaderUser'
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from './Logo';
import { Notifications } from './Notifications';

interface Props {
  name: string;
  image: string;
  userType: "admin" | "customer";
};

export const Header = ({ image, userType, name }: Props) => {

  const { push } = useRouter();
  const path = usePathname();

  const pathToRedirect = path.startsWith('/admin') ? '/admin' : '/dashboard';

  return (
    <>
    <div className='w-full h-4 bg-1 z-20 sticky top-0'/>
    <div className='w-full max-w-[1200px] rounded-xl z-20 sticky top-4 flex gap-x-4'>
        <div className='p-4 h-24 w-[250px] rounded-xl shadow bg-white flex items-center justify-center'>
            <Logo/>
        </div>
        <div className='header p-4 h-24 w-full rounded-xl flex items-center justify-end gap-x-5'>
          <Notifications />
          <HeaderUser name={ name } image={ image }/>
        </div>
    </div>
    </>
  )
}
