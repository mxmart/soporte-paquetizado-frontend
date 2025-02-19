'use client';
import useToggle from '@/hooks/useToggle';
import { IMessage } from '@/interfaces';
import { useTicketStore, useUserStore } from '@/store';
import { useParams } from 'next/navigation';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { MdGroupAdd } from 'react-icons/md';
import { RiAttachment2, RiSendPlane2Fill } from 'react-icons/ri';

interface Props {
    company_id: number 
};

export const SendMessage = ({ company_id }: Props) => {

    const { toggle, isOpen } = useToggle();
    const [message, setMessage] = useState<string>('');

    const user = useUserStore( state => state.user );

    const sendMessage = useTicketStore( state => state.sendMessage );
    const socket = useTicketStore( state => state.socket ); 

    const inputRef: RefObject<HTMLInputElement> = useRef<any>(null);
    const buttonRef: React.MutableRefObject<HTMLButtonElement | null>  = useRef(null);
    const { id } = useParams();

    const onSendMessage = () => {
        if( message.trim().length === 0 ) return;
        const message_payload: IMessage = {
            id: Number(new Date()),
            content: message,
            creation_date: new Date(),
            send_by: user?.account_holder!,
            profile_pic: user?.profile_picture!,
            user_id: user?.id!,
            cognito_sub: user?.cognito_sub!,
            content_type_id: 10,
            type: 'TEXT'
        }
        sendMessage(message_payload);
        setMessage('');
        //TODO: Guardar mensaje en la base de datos
    }; 

    const onSendFile = async( e: any ) => {

    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            buttonRef!.current!.click();
          }
        };
     
        window.addEventListener('keydown', handleKeyDown);
        return () => { window.removeEventListener('keydown', handleKeyDown)};
    }, []);

  return (
    <div className='w-full h-12 border-t flex justify-between items-center relative send-message-ticket'>
        {
            !isOpen
            ? (
                <>
                <input
                    value={ message }
                    onChange={ (e) => setMessage(e.target.value) }
                    type="text"
                    className='w-full h-full px-6 focus:outline-none text-sm'
                    placeholder='Escribe aquí / Write here'
                    style={{ boxShadow: 'none' }}
                />
                <input onChange={ onSendFile } ref={ inputRef } type="file" className='hidden' />
                <div className='flex w-auto items-center gap-x-3 px-6 text-primary justify-between'>
                    <button className='text-2xl font-bold add-file' onClick={(e) => { e.preventDefault(); inputRef.current!.click() }}>
                        <RiAttachment2 />
                    </button>
                    <button className='text-2xl font-bold add-file' onClick={toggle}>
                        <MdGroupAdd />
                    </button>
                    <button ref={ buttonRef } onClick={ onSendMessage } className='text-2xl font-bold add-file'>
                        <RiSendPlane2Fill />
                    </button>
                </div>
                </>
            ) : (
                <></>
            )
        }
    </div>
  )
}
