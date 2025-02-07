'use client'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MenuItem } from './MenuItem';
import { checkUserPermissions } from '@/helpers';
import { SpinLoader } from '../SpinLoader';
import { logout } from '@/services';

interface Props {
    isOpen: boolean
};

const navOptions = [
    { title: 'Dashboard',       callback: () => {},         href: '/dashboard',         permission: ''                          },
    { title: 'Perfíl',          callback: () => {},         href: '/dashboard/profile', permission: ''                          },
    { title: 'Cerrar sesión',   callback: () => logout(),   href: '/auth/login',        permission: ''                          },
];

const navOptionsAdmin = [
    { title: 'Dashboard',       callback: () => {},         href: '/admin',                         permission: ''                              },
    { title: 'Perfíl',          callback: () => {},         href: '/admin/profile',                 permission: ''                              },
    { title: 'Configuración',   callback: () => {},         href: '/admin/platform-configuration',  permission: 'platform-configuration'        },
    { title: 'Cerrar sesión',   callback: () => logout(),   href: '/auth/login',                    permission: ''                              },
];

export const Menu = ({ isOpen }: Props) => {

    const path = usePathname();
    const optionsToShow = path.startsWith('/admin') ? navOptionsAdmin : navOptions;
    const [menuOptions, setMenuOptions] = useState<any>([]);
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);

    const canSeeOption = () => {
        const fetchOptions = async() => {
            const menuOptionsList = [] as any;
            await Promise.all(
                optionsToShow.map( async( option ) => {
                    const canSee = await checkUserPermissions([option.permission]);
                    if ( canSee ) {
                        menuOptionsList.push(option);
                    }
                })
            );
            setMenuOptions(( prevOptions: any ) => {
                const uniqueOptions = menuOptionsList.filter(( newOption: any ) => !prevOptions.some((prevOption: any) => prevOption.title === newOption.title ));
                return prevOptions.concat(uniqueOptions);
            });
            setIsLoadingOptions(false);
        };
        fetchOptions();
    };

    useEffect(() => {
      canSeeOption();
    }, []);

  return (
    <div className={`menu w-48 h-auto p-3 rounded-lg items-center justify-center absolute right-2 lg:right-0 top-12 ${ isOpen ? 'flex' : 'hidden' } rounded-md shadow-lg fade-in`}>
        <div className='w-full flex flex-col mx-auto gap-y-2 px-5 text-sm'>
            {
                isLoadingOptions
                ? <SpinLoader text={ false }/>
                : menuOptions.map(( option: any ) => (
                    <MenuItem
                        callback={ option.callback }
                        href={ option.href }
                        key={ option.title }
                        permission={ option.permission }
                        title={ option.title }
                    />
                ))
            }
        </div>
    </div>
  )
}
