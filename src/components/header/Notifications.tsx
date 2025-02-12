'use client'
import { useNotificationsStore } from '@/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { RiNotification2Fill } from 'react-icons/ri';
import { SpinLoader } from '../SpinLoader';

export const Notifications = () => {

    const pathName = usePathname();
    const notificationHref = pathName.startsWith('/admin') ? '/admin/notifications?page=1' : '/dashboard/notifications?page=1'
    const unreadedNotifications = useNotificationsStore( state => state.unreadedNotifications );
    const isLoadingNotifications = useNotificationsStore( store => store.isLoadingNotifications );

  return (
    <Link href={notificationHref} className='notification flex items-center gap-1 ms-2'>
        <div className={`${ !isLoadingNotifications && 'bubble' } hidden lg:flex items-center justify-center w-8 h-8 rounded-full `}>
        {
            isLoadingNotifications
            ? <SpinLoader text={ false }/>
            : <p className='fill-transparent font-semibold'>{ unreadedNotifications || 0 }</p>
        }
        </div>
        <div className='lg:hidden flex items-center justify-center text-xl'>
            { !isLoadingNotifications && <RiNotification2Fill className='icon'/> }
            {
            isLoadingNotifications
            ? <SpinLoader text={ false }/>
            : <span className='text-sm ms-1'>{ unreadedNotifications || 0 }</span>
            }
        </div>
        <p className='font-light lg:flex hidden'>Notificaciones</p>
    </Link>
  )
}
 