'use client';
import { useClickOutside } from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RiPencilFill, RiSearch2Line } from 'react-icons/ri';
import { SpinLoader } from '../SpinLoader';

interface Props {
    label?: string;
    placeholder: string;
    state: 'new' | 'update';
    items: Item[];
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
    value?: string | number;
    name: string;
    setValue: UseFormSetValue<any>;
    isSubmitted?: boolean;
    isReseted?: boolean;
    edit?: boolean;
};

interface Item {
    id: number;
    description: string;
};

export const Suggestions = ({
    placeholder,
    edit = false,
    isReseted,
    isSubmitted, 
    isLoading,
    disabled,
    state, 
    items = [],
    name,
    className = '',
    value,
    label,
    setValue,
}: Props) => {

    const { isOpen, menuRef, setIsOpen } = useClickOutside();
    const [canWrite, setCanWrite] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>(value ? String(value) : '');
    const [filteredItems, setFilteredItems] = useState<Item[]>(items);
    const [isMounted, setIsMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsMounted(true);
        return () => {
          setIsMounted(false);
        };
      }, []);

      const onClickOption = (option: Item) => {
        setIsOpen(false);
        setInputValue(option.description);
        setFilteredItems(items);
        if (setValue) setValue(`${name}`, String(option.id));
      };

      const onFilterItems = () => {
        setFilteredItems(items.filter((item) => item.description?.toLowerCase().includes(inputValue.toLowerCase())));
      };

      useEffect(() => {
        if (value && setValue && !isLoading) {
          const input = items.find((item) => item.id === Number(value));
          if (input) {
            setInputValue(input.description);
            setValue(`${name}`, String(input.id));
          }
        }
      }, [value, setValue, items, isLoading, name, isMounted]);

      useEffect(() => {
        onFilterItems();
      }, [inputValue, isLoading]);

      useEffect(() => {
        if (state === 'update') return setCanWrite(edit);
        if (state === 'new') return setCanWrite(true);
      }, [edit, state]);

      useEffect(() => {
        if(state==="update"){
          if (value) {
            const input = items.find((item) => item.id === Number(value));
            if (input) {
              setInputValue(input.description);
              setValue!(`${name}`, String(input.id));
            }
          }else
          setInputValue('');
        }
      }, [[isSubmitted === true || isReseted === true ]]);

      const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true);
      };

      const handleOpen = () => {
        setIsOpen(!isOpen);
        inputRef.current?.focus();
        setFilteredItems(items);
      };
    

  return (
    <div ref={menuRef} className={`${className} relative flex flex-col gap-2 w-full max-w-72 lg:max-w-80 select input`}>
        { label && <label className='text-sm font-medium'>{ label }</label> }
        <input
            onClick={ handleOpen }
            ref={ inputRef }
            value={ inputValue }
            onChange={ onInputChange }
            disabled={ !canWrite || disabled }
            type="text"
            placeholder={ placeholder }
            className={`input-shadow rounded-lg h-9 w-full max-w-80 placeholder:text-xs placeholder:font-medium px-4 text-xs font-semibold focus:outline-none`}
        />
        <button
            type='button'
            className={`${ state === 'update' && !canWrite ? 'flex' : 'hidden' } ${ disabled && 'hidden' } cursor-default absolute top-9 right-2 w-5 h-5 text-sm rounded-full items-center justify-center`}
        >
            <RiPencilFill />
        </button>
        <button
            type='button'
            className={`cursor-default absolute top-9 right-2 w-5 h-5 text-sm rounded-full items-center justify-center ${ canWrite && !disabled ? 'flex' : 'hidden' }`}
        >
            <RiSearch2Line />
        </button>

        <div className={`${ isOpen ? 'block' : 'hidden' } dropdown no-scrollbar fade-in z-10 absolute top-[70px] left-0 w-full rounded-lg h-auto max-h-44 overflow-y-auto p-2 flex flex-col gap-2`}>
            {
                isLoading
                ? ( <SpinLoader width='w-[13px]' height='h-[13px]'/> )
                : items?.length === 0
                ? ( <span className='text-white text-center text-xs dropdown-text'>No hay información</span> )
                : ( items?.map( item => (
                    <span onClick={() => onClickOption(item)}
                        key={ item.id } 
                        className='hover:underline text-white dropdown-text text-xs'>
                        { item.description }
                    </span>
                    ))
                )
            }
        </div>
    </div>
  )
}
