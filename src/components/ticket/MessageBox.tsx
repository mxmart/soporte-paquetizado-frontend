'use client';
import React, { useEffect, useRef, useState } from 'react';
import { SendMessage } from './SendMessage';
import { AdviseSendMessage } from './AdviseSendMessage';
import { Event } from './Event';
import { MyMessage } from './MyMessage';
import { Message } from './Message';
import { useTicketStore, useUserStore } from '@/store';
import { useParams } from 'next/navigation';

interface Props {
    isTicketOpen: boolean;
    userInTicket: boolean;
    company_id:   number;
  }; 

export const MessageBox = ({ isTicketOpen, userInTicket, company_id }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useUserStore(state => state.user);

  const socket = useTicketStore( state => state.socket );
  const isConnected = useTicketStore( state => state.isConnected );
  const messages = useTicketStore( state => state.messages );
  const leaveChatRoom = useTicketStore( state => state.leaveChatRoom );
  const closeSocketConnection = useTicketStore( state => state.closeSocketConnection );

  const messagesRef = useRef(null) as any;
  const { id } = useParams();

  useEffect(() => {
    if( socket ) {
      const message = {"action": "joinChatRoom", "room_id": String( id )};
      socket.send( JSON.stringify( message ));
    }
  }, [ isConnected ]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [ messages ]);

  useEffect(() => {
    return () => {
      leaveChatRoom();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', closeSocketConnection );
    return () => { window.removeEventListener('beforeunload', closeSocketConnection) };
  }, []);

  return (
    <div className='w-full h-auto min-h-[500px]'>
        <div className='h-[550px] px-2 md:px-4 overflow-y-auto no-scrollbar mb-1' ref={messagesRef}>
          {
            isLoading
            ? <></>
            : messages?.map( message => (
              message.type === "EVENT"
              ? <Event key={ message.id } message={ message }/>
              : user?.cognito_sub === message.cognito_sub
              ? <MyMessage key={ message.id } message={ message }/>
              : <Message key={ message.id } message={ message }/>
            ))
          }
            {/* <Event message={{ content: 'Admin general ha creado este ticket', creation_date: new Date() }}/>
            <MyMessage message={{ type: 'TEXT', content: 'Comentario en la conversacion', send_by: 'Administrador' }}/>
            <Message message={{ type: 'TEXT', content: 'Comentario en la conversacion', send_by: 'Administrador' }}/>
            <Event message={{ content: 'Admin general te ha unido a la conversacion', creation_date: new Date() }}/> */}
        </div>
        {
            isTicketOpen && userInTicket
            ? <SendMessage company_id={ company_id }/>
            : <AdviseSendMessage isTicketOpen={ isTicketOpen } userInTicket={ userInTicket }/>
        }
    </div>
  )
}
