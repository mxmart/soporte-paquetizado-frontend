'use client';
import React from 'react'
import { Button, CheckSelect, Input, Select, Suggestions } from '..';
import { useForm } from 'react-hook-form';
import { UploadFiles } from './UploadFiles';

interface Props {
    userType: "admin" | "customer";
};

export const TicketForm = ({ userType }: Props) => {

    const { setValue, handleSubmit, register, watch, getValues, reset } = useForm();
    
    return (
        <form  className='flex flex-wrap gap-5 justify-center w-full mt-8'>
            <Suggestions 
                placeholder={'Seleccione el cliente para el nuevo ticket'} 
                state={'new'} 
                items={[]} 
                name={''} 
                setValue={setValue}
                label='Cliente'
            />
            <div className={`w-full max-w-72 lg:max-w-80`} />
            <Select
                label='Selecciona tipo de ticket:'
                placeholder='Tipo de ticket'
                state='new'
                items={[]}
                isLoading={false}
                setValue={setValue}
                name=""
                isReseted={false} 
                value={''}
            />
            <CheckSelect
                label='Compartir con:'
                placeholder='Seleccione usuarios'
                state="new"
                items={[]}
                isLoading={false}
                setValue={setValue}
                updateIf={watch("ticket.companie_id")}
                name="ticket.users"
                isReseted={false} value={[]}            
            />
            <Input
                label='Título:'
                placeholder='Escriba un título para este ticket'
                state='new'
                type='text'
                edit={true}
                register={register}
            />
            <Select
                label='Prioridad:'
                placeholder='Prioridad'
                state='new'
                items={[]}
                isLoading={false}
                setValue={setValue}
                name=""
                isReseted={false} 
                value={''}
            />
            <Input
                label='Descripción:'
                placeholder='Escriba una descripción para este ticket'
                state='new'
                type='textarea'
                register={ register }
            />

            <UploadFiles/>

            <div className="flex items-end mt-10 w-full justify-end gap-x-2 pb-2">
                <Button text='Cancelar' type='button'/>
                <Button disabled text='Guardar' type='submit'/>
            </div>
        </form>
    )
}