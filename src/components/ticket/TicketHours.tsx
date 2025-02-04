'use client'
import React from 'react'
import { Button } from '../Button';

interface Props {
    userType: 'admin' | 'customer';
    isTicketOpen: boolean;
    userInTicket: boolean;
};

export const TicketHours = ({ userType, isTicketOpen, userInTicket }: Props) => {
  return (
    
    <div className='w-full max-w-72 lg:max-w-80 input'>
        <label className='text-sm font-medium'>Horas de trabajo reportadas:</label>
        <div className="flex flex-row items-center justify-center gap-x-2 text-2">
            <input
                placeholder={'0'}
                type="number"
                className={`shadow-input block ${ userType === 'admin' ? 'w-[100px]' : 'w-[100px] sm:w-full' } px-4 py-2 rounded-md mt-2 shadow-lg focus:outline-none sm:text-sm`}
                disabled
                />

            <div className={`relative w-full items-center ${ userType === 'customer' ? 'hidden' : 'flex' }`}>
                <input
                    placeholder={'0'}
                    type="number"
                    className="shadow-input block w-full lg:w-[190px] px-4 py-2 rounded-md mt-2 shadow-lg focus:outline-none sm:text-sm"
                    disabled
                />
                <button
                    style={{ color: 'white' }}
                    type='button'
                    className="absolute top-4 right-2 flex text-xs button px-2 rounded-md py-1"
                    disabled={ !isTicketOpen || !userInTicket }
                >
                    Agregar
                </button>
            </div>
        </div>
    </div>
  )
}
