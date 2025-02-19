'use client';
import React, { useEffect } from 'react'
import { useNotificationsStore, useTicketStore, useUserStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { Toaster as ToasterNotification } from 'react-hot-toast';
import { Session } from './Session';

export const Providers = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    const user = useUserStore( state => state.user );
    const setSocketNotifications = useNotificationsStore( state => state.setSocketNotifications );
    const setSocketTicket = useTicketStore( state => state.setSocketTicket );

    useEffect(() => {
        if( user?.cognito_sub !== '' ){
          setSocketNotifications();
          setSocketTicket();
        };
    }, []);

    return (
        <QueryClientProvider client={ queryClient }>
            <SessionProvider>
                <Session/>
                <Toaster
                    position='bottom-right'
                    duration={ 3000 }
                    richColors
                    style={{
                        fontSize: 14, textAlign: 'center'
                    }}
                />
                {/* <ToasterNotification
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{
                    duration: 2000,
                    style: {
                        fontSize: 14, textAlign: 'center'
                    }
                    }}
                /> */}
                <ReactQueryDevtools/>
                { children }
            </SessionProvider>
        </QueryClientProvider>
    )
};