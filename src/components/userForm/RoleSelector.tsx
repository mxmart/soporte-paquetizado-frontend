'use client';
import { useClickOutside } from '@/hooks';
import React, { useEffect, useState } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri';
import { SpinLoader } from '../SpinLoader';
import { UseFormSetValue } from 'react-hook-form';

interface Props {
    disabled?: boolean;
    state: "new" | "update";
    edit?: boolean;
    label?: string;
    placeholder: string;
    isLoading?: boolean;
    items: Item[];
    value: number;
    name: string;
    isSubmitted?: boolean; 
    isReseted?: boolean;
    setValue: UseFormSetValue<any>;
};

interface Item {
    id: number;
    description: string;
    label: string;
};

export const RoleSelector = ({ disabled = false, isReseted, isSubmitted, edit = false, state, label, placeholder, isLoading, items, setValue, name, value }: Props) => {

    const { isOpen, menuRef, setIsOpen } = useClickOutside();
    const [canWrite, setCanWrite] = useState<boolean>( true );
    const [inputValue, setInputValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isMounted, setIsMounted] = useState(false);

    const handleOption = ( option: Item ) => {
        setValue(`${ name }`, Number(option.id));
        setInputValue( option.label );
        setDescription( option.description );
        setIsOpen( false ); 
    };
    
    useEffect(() => {
        if( state === 'update' ){
            if( isLoading ){
                setInputValue('Cargando...');
            };
        }
        if (value && setValue && !isLoading) {
            const input = items.find(item => item.id === Number(value));
            if (input) {
                setInputValue(input.label);
                setValue(`${ name }`, Number(input.id));
                setDescription( input.description );
            }else{
            }
        }
    }, [value, setValue, items, isLoading, name, state, isMounted]);

    useEffect(() => {
        setIsMounted( true );
        return () => { setIsMounted( false ) }
    }, []);

    useEffect(() => {
        if( state === 'update' ) return setCanWrite( edit );
        if( state === 'new' )    return setCanWrite( true );
    }, [ edit ]);

    useEffect(() => {
        setInputValue("");
        setValue!(`${ name }`, "");
        setDescription("");
    }, [ isReseted ]);

    useEffect(() => {
        if(value){
            const input = items.find(item => item.id === Number(value));
                if (input) {
                    setInputValue(input.label);
                    setDescription( input.description );
                    setValue!(`${ name }`, Number(input.id));
                }
            }
        else{
            setInputValue('');
        }
    }, [isSubmitted === true, isReseted === true ]);

  return (
    <div ref={ menuRef } className={`flex flex-col gap-2 w-full max-w-72 lg:max-w-80 role-selector input mt-4`} onClick={ () => setIsOpen( canWrite && !disabled ? !isOpen : false ) }>
        { label && <label className='text-sm font-semibold md:text-start text-center'>{ label }</label> }

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
                            { item.label }
                        </span>
                        ))
                    )
                }
            </div>
        </div>
        {
            isLoading
            ? (
                <>
                <div className="w-full h-3 loading-description-role rounded-2xl animate-pulse"></div>
                <div className="w-full h-3 loading-description-role rounded-2xl animate-pulse"></div>
                <div className="w-full h-3 loading-description-role rounded-2xl animate-pulse"></div>
                </>
            ) : <p className='text-xs'>{ description }</p>
        }
    </div>
  )
}
