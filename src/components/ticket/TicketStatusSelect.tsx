'use client'
import { useClickOutside } from '@/hooks';
import { useParams } from 'next/navigation';
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
    currentTicketStatus: number;
    setValue: UseFormSetValue<any>;
    refresh: () => void;
};

interface Item {
    id: number;
    description: string;
};

export const TicketStatusSelect = ({ refresh, currentTicketStatus, placeholder, disabled = false, edit = false, isReseted=false, isSubmitted, label, items = [], hidden, state, setValue, name, isLoading, value }: Props) => {
  
    const { isOpen, menuRef, setIsOpen } = useClickOutside();

    const [canWrite, setCanWrite] = useState<boolean>( true );
    const [inputValue, setInputValue] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);
    const [changingStatus, setChangingStatus] = useState(false);

    const params =  useParams();

    useEffect(() => {
        setIsMounted( true );
        return () => { setIsMounted( false ) }
    }, []);

    const handleOption = async( option: Item ) => {
        if( setValue ){
            if( currentTicketStatus === option.id ) return;
            setChangingStatus(true);
            setValue(`${ name }`, String(option.id));
            setInputValue( option.description );
            setIsOpen( false );
            // await updateTicketStatus({ ticket_status_id: String(option.id), ticket_id: String(params.id) });
            // const event = `${ user?.account_holder } ha cambiado el status del ticket a ${ ticketStatusObject[option.id]}`;
            // sendEvent( event, user!, String(params.id) );
            refresh();
            setChangingStatus(false);
        };
    };

    useEffect(() => {
        if (value && setValue && !isLoading) {
            const input = items.find(item => item.id === Number(value));
            if (input) {
                setInputValue(input.description);
                setValue(`${ name }`, String(input.id));
            }
        }
    }, [value, setValue, items, isLoading, name, state, isMounted]);

    useEffect(() => {
        if( state === 'update' ) return setCanWrite( edit );
        if( state === 'new' )    return setCanWrite( true );
    }, [ edit ]);

    useEffect(() => {
        if(value){
            const input = items.find(item => item.id === Number(value));
            if (input) {
                setInputValue(input.description);
                setValue!(`${ name }`, String(input.id));
            }
        }
        else{
            setInputValue('');}
    }, [isSubmitted === true || isReseted === true ])
  
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
                    ? ( <span className='text-white text-center text-xs dropdown-text'>No hay información</span> )
                    : ( items?.map( item => (
                        <span onClick={ () => handleOption( item ) }
                            key={ item.id } 
                            className='hover:underline text-white dropdown-text text-xs'>
                            { item.description }
                        </span>
                        ))
                    )
                }
            </div>
        </div>
    </div>
  )
}
