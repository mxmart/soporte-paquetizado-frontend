'use client';
import React, { useRef } from 'react';
import { SendMessage } from './SendMessage';
import { AdviseSendMessage } from './AdviseSendMessage';
import { Event } from './Event';
import { MyMessage } from './MyMessage';
import { Message } from './Message';

interface Props {
    isTicketOpen: boolean;
    userInTicket: boolean;
    company_id:   number;
  };

export const MessageBox = ({ isTicketOpen, userInTicket, company_id }: Props) => {

    const messagesRef = useRef(null) as any;

  return (
    <div className='w-full h-auto min-h-[500px]'>
        <div className='h-[550px] px-2 md:px-4 overflow-y-auto no-scrollbar mb-1' ref={messagesRef}>
            <Event message={{ content: 'Admin general ha creado este ticket', creation_date: new Date() }}/>
            <MyMessage message={{ type: 'TEXT', content: 'Comentario en la conversacion', send_by: 'Administrador' }}/>
            <Message message={{ type: 'TEXT', content: 'Comentario en la conversacion', send_by: 'Administrador' }}/>
            <Event message={{ content: 'Admin general te ha unido a la conversacion', creation_date: new Date() }}/>
        </div>
        {
            isTicketOpen && userInTicket
            ? <SendMessage company_id={ company_id }/>
            : <AdviseSendMessage isTicketOpen={ isTicketOpen } userInTicket={ userInTicket }/>
        }
    </div>
  )
}
