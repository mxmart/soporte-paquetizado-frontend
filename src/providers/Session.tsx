'use client'
import { IUser } from '@/interfaces';
import { useUserStore } from '@/store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export const Session = () => {

    const setUser = useUserStore( store => store.setUser );
    const { data, update } = useSession();

    useEffect(() => {
        setUser( data?.user as IUser );
    }, [ data?.user ])
    
  return <></>
}
