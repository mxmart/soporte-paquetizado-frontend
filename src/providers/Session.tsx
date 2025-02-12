'use client'
import { IUser } from '@/interfaces';
import { useNotificationsStore, useUserStore } from '@/store';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export const Session = () => {

    const setUser = useUserStore( store => store.setUser );
    const getNotifications = useNotificationsStore( store => store.getNotifications );
    const { data } = useSession();

    useEffect(() => {
        setUser( data?.user as IUser );
    }, [ data?.user ]);

    useEffect(() => {
      getNotifications("1", "all");
    }, []);
    
  return <></>
}
