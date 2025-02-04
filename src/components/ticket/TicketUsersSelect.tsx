'use client'
import { useClickOutside } from '@/hooks';
import React, { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { SpinLoader } from '../SpinLoader';

interface Props {
    placeholder: string;
    label?: string;
    items: Item[];
    hidden?: boolean
    state: "new" | "update";
    name: string;
    isLoading?: boolean;
    value: string;
    isSubmitted?: boolean; 
    isReseted?: boolean;
    edit?: boolean;
    disabled?: boolean;
    title?: string;
    setValue: UseFormSetValue<any>;
};

interface Item {
    id: number;
    account_holder: string;
};

export const TicketUsersSelect = ({ placeholder, title, disabled = false, label, items = [], hidden, state, isLoading }: Props) => {

    const { isOpen, menuRef, setIsOpen } = useClickOutside();

    const [canWrite, setCanWrite] = useState<boolean>( true );
    const [inputValue, setInputValue] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted( true );
        return () => { setIsMounted( false ) }
    }, []);

    useEffect(() => {
        if( items?.length === 0 ){ 
            setInputValue(`No hay ${ title }s asignados`);
        } else {
            setInputValue(`${ items?.length } ${ title }${ items.length >= 2 ? 's' : '' }`);
        }
    }, [items, isMounted]);

  return (
    <div ref={ menuRef } className={`${ hidden ? 'hidden' : 'flex' } flex-col gap-2 w-full max-w-72 lg:max-w-80 select input`} onClick={ () => setIsOpen( canWrite && !disabled ? !isOpen : false ) }>
        { label && <label className='text-sm font-medium'>{ label }</label> }

        <div className={`${ canWrite && !disabled ? 'cursor-pointer' : disabled && canWrite ? 'cursor-default' : 'cursor-default' } input relative items-center rounded-lg h-9 w-full max-w-80 placeholder:text-xs px-4 text-10 focus:outline-none flex justify-between text-sm font-medium`}>
            <span className="text-xs" style={{ border: 'none' }}>
                {  inputValue || placeholder }
            </span>
            <button type='button' className={`${ isOpen ? 'rotate-180' : 'rotate-360' } ${ state === 'update' && canWrite && !disabled && 'hidden' } ${ !canWrite && 'hidden' } ${ disabled && 'hidden' } transition-all text-2xl rounded-full`}>
                <RiArrowDropDownLine />
            </button>

            <div className={`${ isOpen ? 'block' : 'hidden' } dropdown no-scrollbar fade-in z-10 absolute top-10 left-0 w-full rounded-lg h-auto max-h-44 overflow-y-auto p-2 flex flex-col gap-2`}>
                {
                    isLoading
                    ? ( <SpinLoader width='w-[13px]' height='h-[13px]'/> )
                    : items?.length === 0
                    ? ( <span className='text-white text-center text-xs dropdown-text'>No hay { title }s</span> )
                    : ( items?.map( item => (
                        <span
                            key={ item.id } 
                            className='hover:underline text-white dropdown-text text-xs'>
                            { item.account_holder }
                        </span>
                        ))
                    )
                }
            </div>
        </div>
    </div>
  )
}
