'use client';
import React, { useEffect, useState } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';

interface Props {
    placeholder: string;
    type: "email" | "password" | "text" | "number" | "textarea";
    state: "new" | "update";
    label?: string;
    disabled?: boolean;
    className?: string;
    hidden?: boolean;
    edit?: boolean;
    register: any
};

export const Input = ({ placeholder, state, type, className = '', disabled = false, label, hidden = false, edit = false, register }: Props) => {

    const [canWrite, setCanWrite] = useState<boolean>( edit );

    useEffect(() => {
        if( state === 'update' ) return setCanWrite( edit );
        if( state === 'new' ) return setCanWrite( true );
    }, [ edit ]);

  return (
    <>
    {
        type === 'textarea'
        ? (
            <div className={`${ className } relative flex flex-col gap-2 w-full max-w-72 sm:max-w-[85%] textarea`}>
                { label && <label className={`font-medium text-sm`}>{ label }</label> }
                <textarea
                    placeholder={ placeholder }
                    disabled={ !canWrite || disabled }
                    { ...register }
                    className={`input-shadow placeholder:py-1 py-2 rounded-lg h-20 w-full placeholder:text-xs px-4 text-sm focus:outline-none`}
                ></textarea>
            </div>
        ) : (
            <div className={`${ hidden ? 'hidden' : 'flex' } ${ className } relative flex-col gap-2 w-full max-w-72 lg:max-w-80 input`}>
                { label && <label className={`text-sm font-medium`}>{ label }</label> }
                <input
                    disabled={ !canWrite || disabled }
                    type={ type }
                    placeholder={ placeholder }
                    { ...register }
                    className={`input-shadow rounded-lg h-9 w-full max-w-80 placeholder:text-xs placeholder:font-medium px-4 text-xs font-semibold focus:outline-none`}
                />
                <button
                    type='button'
                    className={`${ state === 'update' && !canWrite ? 'flex' : 'hidden' } ${ disabled && 'hidden' } cursor-default absolute top-9 right-2 w-5 h-5 text-sm rounded-full items-center justify-center`}
                >
                    <RiPencilFill />
                </button>
            </div>
        )
    }
    </>
  )
}
