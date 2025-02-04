'use client'
import React, { useEffect, useState } from 'react'
import { MdGroupAdd } from 'react-icons/md';
import { RiAttachment2, RiSendPlane2Fill } from 'react-icons/ri';

interface Props {
    isTicketOpen: boolean;
    userInTicket: boolean;
};

export const AdviseSendMessage = ({ isTicketOpen, userInTicket }: Props) => {

    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const statusMessage = !isTicketOpen && !userInTicket
            ? 'No puedes enviar mensajes porque el ticket está cerrado'
            : isTicketOpen && !userInTicket
            ? 'Únete a esta conversación para enviar un mensaje'
            : !isTicketOpen
            ? 'No puedes enviar mensajes porque el ticket está cerrado'
            : '';
        setMessage(statusMessage);
    }, [ isTicketOpen, userInTicket ])

  return (
    <div className="w-full h-12 border-t flex justify-between items-center relative send-message-ticket">
      <input
        disabled
        type="text"
        className="w-full h-full px-6 focus:outline-none text-sm disabled:bg-white"
        placeholder={ message }
        style={{ boxShadow: 'none' }}
      />
      <div className="flex w-auto items-center gap-x-3 px-6 text-primary justify-between">
        <button disabled className="text-2xl font-bold disabled:text-gray-300">
          <RiAttachment2 />
        </button>
        <button
          disabled
          className="text-2xl font-bold disabled:text-gray-300"
        >
          <MdGroupAdd />
        </button>
        <button disabled className="text-2xl font-bold disabled:text-gray-300">
          <RiSendPlane2Fill />
        </button>
      </div>
    </div>
  )
}
