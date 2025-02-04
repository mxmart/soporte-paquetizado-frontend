'use client'
import React from 'react'
import { Select } from '../inputs/Select';
import { useForm } from 'react-hook-form';
import { Input } from '../inputs/Input';
import { TicketStatusSelect } from './TicketStatusSelect';
import { TicketUsersSelect } from './TicketUsersSelect';
import { TicketHours } from './TicketHours';
import { Button } from '../Button';

interface Props {
    userType: "admin" | "customer";
    isTicketOpen: boolean;
    userInTicket: boolean;
    ticketStatus: number;
};


export const TicketInformationForm = ({ userType, isTicketOpen, userInTicket }: Props) => {

    const { getValues, setValue, register } = useForm();

  return (
    <>
    <form className='flex flex-wrap gap-5 justify-center w-full mt-6'>
        <TicketStatusSelect
            label='Estado de solicitud:'
            placeholder='Estado de solicitud'
            currentTicketStatus={ 1 }
            items={[]}
            name=''
            state='new'
            value=''
            refresh={() => {}}
            setValue={ setValue }
        />
        <Select
            label='Tipo:'
            placeholder='Tipo del ticket'
            name=''
            items={[]}
            setValue={ setValue }
            state='new'
            value={0}
            disabled
        />
        <Input
            label='ID de ticket:'
            placeholder='ID'
            register={ register }
            state='new'
            type='text'
            disabled
        />
        <TicketUsersSelect
            label='Compartido con:'
            placeholder='Compartido con'
            name=''
            state='new'
            value=''
            title="cliente"
            items={[]}
            setValue={ setValue }
        />
        <TicketUsersSelect
            label='Agentes involucrados:'
            placeholder='Compartido con'
            name=''
            state='new'
            value=''
            title="agente"
            items={[]}
            setValue={ setValue }
        />
        <TicketHours
            userType={ userType }
            isTicketOpen={ isTicketOpen }
            userInTicket={ userInTicket }
        />

        <Button
            hidden={ userInTicket }
            disabled={ !isTicketOpen }
            text='Únirme a esta conversación' 
            type='button'
        />
    </form>
    </>
  )
}
