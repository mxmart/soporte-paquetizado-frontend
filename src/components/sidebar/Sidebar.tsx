'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import { SidebarItem } from './SidebarItem';

const sidebarClient = [
  { id: 1, icon: 'Icon_home.svg',       href: '/dashboard',               permission: '' , title:"Inicio" },
  // { id: 1, icon: 'Icon_user.svg',       href: '/soporte/account-info',  permission: '' , title:"Informacion"},
  // { id: 4, icon: 'Icon_Companies.svg',  href: '/soporte/organization',  permission: '', title:"Organización"},
  // { id: 3, icon: 'Icon_ticket.svg',     href: '/soporte/tickets',       permission: '', title:"Tickets"}, 
  { id: 6, icon: 'Icon_exit.svg',       href: '/auth/login',              permission: '', title:"Salir" },
];

const sidebarAdmin = [
  { id: 1, icon: 'Icon_home.svg',           href: '/admin',                 permission: '', title: "Inicio" },
  // { id: 2, icon: 'Icon_Companies.svg',  href: '/admin/organizations',   permission: 'get-organizations', title:"Organizaciones"},
  // { id: 3, icon: 'Icon_ticket.svg',     href: '/admin/tickets',         permission: '', title:"Tickets"},
  // { id: 5, icon: 'Mailbox.svg',         href: '/admin/mailbox?page=1',  permission: 'view-suggestions', title:"Bandeja de correos"},
  { id: 6, icon: 'Icon_exit.svg',           href: '/auth/login',            permission: '', title:"Salir" },
]

export const Sidebar = () => {

  const path = usePathname();
  const optionsToShow = path.startsWith('/admin') ? sidebarAdmin : sidebarClient;

  return (
    <div className='sidebar h-screen w-16 fixed hidden sm:flex items-center justify-center flex-col gap-y-16'>
      { optionsToShow.map( item => <SidebarItem key={ item.id } { ...item } /> )}
    </div>
  )
}
