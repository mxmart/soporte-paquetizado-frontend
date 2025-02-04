'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import React, { useEffect } from 'react'
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={ queryClient }>
            <SessionProvider>
                <Toaster
                    position='bottom-right'
                    duration={ 3000 }
                    richColors
                    style={{
                        fontSize: 14, textAlign: 'center'
                    }}
                />
                <ReactQueryDevtools/>
                { children }
            </SessionProvider>
        </QueryClientProvider>
    )
};