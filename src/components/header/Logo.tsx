'use client'
import Image from 'next/image';
import React, { useEffect } from 'react'
import { IsLoadingLogo } from './IsLoadingLogo';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLogo } from '@/services';
import { useConfigurationStore } from '@/store';

export const Logo = () => {

    const { data, isLoading } = useQuery({ queryKey: ['logo'], queryFn: getLogo });
    
    const isLoadingLogo = useConfigurationStore( state => state.isLoadingLogo );
    const logo = useConfigurationStore( state => state.logo );
    const setLogo = useConfigurationStore( state => state.setLogo );

    const { push } = useRouter();
    const path = usePathname();
    const pathToRedirect = path.startsWith('/admin') ? '/admin' : '/dashboard';

    useEffect(() => {
      setLogo( data || '' );
    }, [ data ]);
    
  return (
    <>
    {
        isLoadingLogo || isLoading
        ? <IsLoadingLogo/>
        : <Image
            onClick={ () => push( pathToRedirect )}
            src={ logo || '/images/evolvenx_not.png'} 
            width={ 100 } 
            height={ 100 } 
            alt='Logo' 
            className='flex items-center justify-center cursor-pointer object-contain h-full w-full'
          />
    }
    </>
  )
}
