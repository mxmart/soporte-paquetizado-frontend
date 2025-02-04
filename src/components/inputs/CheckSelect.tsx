'use client';
import { useClickOutside } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RiAddCircleFill, RiPencilFill } from 'react-icons/ri';
import { SpinLoader } from '../SpinLoader';

interface Props {
    placeholder: string;
    label?: string;
    items: Item[];
    hidden?: boolean
    state: "new" | "update";
    name: string;
    isLoading?: boolean;
    value: Item[];
    isSubmitted?: boolean;
    isReseted?: boolean;
    edit?: boolean;
    disabled?: boolean;
    updateIf?: any;
    setValue: UseFormSetValue<any>;
};

interface Item {
    id: number;
    name: string;
};

export const CheckSelect = ({ hidden, label, placeholder, state, isLoading, items = [], name, setValue, updateIf, value = [], edit=false, isReseted=false }: Props) => {
  
    const { isOpen, menuRef, setIsOpen } = useClickOutside();
    const [canWrite, setCanWrite] = useState<boolean>( edit );
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<Item[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if( state === 'update' ) return setCanWrite( edit );
        if( state === 'new' ) return setCanWrite( true );
    }, [ edit ]);

    const handleOption = ( option: Item ) => {

        const isOptionSelected = selectedOptions.some(opt => opt.id === option.id);
        let newSelectedOptions;
    
        if (isOptionSelected) {
            newSelectedOptions = selectedOptions.filter(opt => opt.id !== option.id);
        } else {
            newSelectedOptions = [...selectedOptions, option];
        };
    
        setSelectedOptions(newSelectedOptions); 
        const inputValue = newSelectedOptions.map(opt => opt.name).join(', ');
        setInputValue(inputValue?.length >= 65 ? inputValue?.slice(0,65) + '...' : inputValue);
    
    };

    useEffect(() => {
        if( setValue ){
            setValue(`${name}`, selectedOptions);
        }
    }, [ selectedOptions ]);

    useEffect(() => {
        if ( !isLoading ) {
            setSelectedOptions([]);
        }
    }, [setValue, items, isLoading, name, state, isMounted]);

    useEffect(() => {
        setInputValue('');
        setSelectedOptions([]);
          if( setValue ){
              setValue(`${name}`, []);
          }
    }, [ updateIf ]);

      useEffect(() => {
        const selectedItems = items?.length
        if( selectedItems === selectedOptions?.length ){
          setIsOpen( false );
        }
    }, [ isLoading, selectedOptions ]);

    useEffect(() => {
        if(value){
            setSelectedOptions([]);
            if(value){ 
                setSelectedOptions(value);
                const inputValue = value.map(opt => opt.name).join(', ');
                setInputValue(inputValue?.length >= 65 ? inputValue?.slice(0,65) + '...' : inputValue);
                setSelectedOptions(value)
            }
        }
        else{
            setInputValue('');
        }
    }, [ isReseted === true ]);

    useEffect(() => {
        setSelectedOptions([]);
        if(value){ 
            setSelectedOptions(value);
            const inputValue = value.map(opt => opt.name).join(', ');
            setInputValue(inputValue);
            setSelectedOptions(value)
        }
    }, [items]);

    useEffect(() => {
        if ( !isLoading ) {
            if(value)
            setSelectedOptions(value?value:[]);
        }
    }, []);
  
    return (
        <div className={`${ hidden ? 'hidden' : 'flex' } flex-col gap-2 w-full max-w-72 lg:max-w-80 select input ${!canWrite && "pointer-events-none"}`}>
            { label && <label className='text-sm font-medium'>{ label }</label> }

            <div ref={ menuRef } className={`relative input items-center text-xs rounded-lg h-9 w-full max-w-80 placeholder:text-xs px-4 text-10 focus:outline-none flex justify-between  `}>
                <span className="text-xs" style={{ border: 'none' }}>
                    {  inputValue || placeholder }
                </span>
                <button onClick={ () => setIsOpen( canWrite ? !isOpen : false ) } type='button' className={`${ isOpen ? 'rotate-180' : 'rotate-360' } transition-all text-2xl ${ !canWrite && 'hidden' } rounded-full`} disabled={!canWrite}>
                    <RiAddCircleFill />
                </button>
                <button 
                    type='button'
                    className={`${ state === 'update' && !canWrite ? 'flex' : 'hidden' } cursor-default absolute top-2 right-2 w-5 h-5 text-sm rounded-full items-center justify-center`}
                >
                    <RiPencilFill />
                </button>

                <div className={`${ isOpen ? 'block' : 'hidden' } dropdown no-scrollbar fade-in z-10 absolute top-10 left-0 w-full rounded-lg h-auto max-h-44 overflow-y-auto p-2 flex flex-col gap-2`}>
                {
                    isLoading
                    ? ( <SpinLoader width='w-[13px]' height='h-[13px]'/> )
                    : items?.length === 0
                    ? ( <span className='text-white text-center text-xs dropdown-text'>No hay información</span> )
                    : ( items?.map( item => (
                        <div key={ item.id } className='flex gap-x-2'>
                            <input type="checkbox" className='cursor-pointer placeholder:text-xs text-sm font-medium ' checked={selectedOptions.some((opt)=>opt.id===item.id)} onChange={ () => handleOption(item) } style={{ boxShadow: 'none' }}/> 
                            <span
                                key={ item.id } 
                                className='text-white '>
                                { item.name }
                            </span>
                        </div>
                        ))
                    )
                }
                </div>
            </div>
        </div>
  )
}
