"use client"
import { useCheckUserPermissions } from '@/hooks/useCheckUserPermissions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { SpinLoader } from '../SpinLoader';

interface Props {
    id: number;
    icon: string;
    href?: string;
    permission: string;
    title:string;
};

export const SidebarItem = ({ id, icon, href, permission, title }: Props) => {

    const { canSee, isLoading } = useCheckUserPermissions([permission]);

    const { prefetch } = useRouter();

  return (
    <>
    {
        isLoading
        ? <SpinLoader text={ false }/>
        : <Link 
            href={ href || "/" } 
            className={`${ canSee ? "block" : "hidden"} hover:scale-125 transition-all duration-100`}
            prefetch
            onMouseEnter={ () => prefetch(href || '/')}
            title={ title }
        >
            <Image
                src={`/images/${icon}`}
                width={20}
                height={20}
                alt={`${ process.env.NEXT_PUBLIC_APP_NAME } Sidebar Icon`}
            />
        </Link>
    }
    </>
  )
}
