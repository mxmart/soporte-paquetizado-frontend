'use client'
import React from 'react'
import { Input } from '../inputs/Input';
import { useForm } from 'react-hook-form';
import { Select } from '../inputs/Select';
import { UploadImage } from '../UploadImage';
import { RoleSelector } from './RoleSelector';
import { Button } from '../Button';
import { IUser } from '@/interfaces';
import { positions } from '@/helpers';

interface Props {
    type: 'new' | 'update';
    userType: 'admin' | 'customer';
    user: IUser;
};

type Inputs = {
    user: IUser
};

export const UserForm = ({ type, userType, user }: Props) => {

    const { register, setValue, getValues } = useForm<Inputs>({ defaultValues: { user }});

  return (
    <form className="w-full h-auto p-2 rounded-lg user-form">
        <div className="flex flex-wrap gap-5 justify-center w-full mt-4 mb-10 items-start">
            <UploadImage
                text='Imagen de perfil:'
                state={ type }
            />
            <RoleSelector
                state={ type }
                label='Rol en la plataforma:'
                placeholder='Seleccione un rol'
                items={[]}
            />
        </div>

        <h2 className='text-center xl:text-start text-primary text-[13px] font-semibold md:px-5 px-3 mt-10'>Información de la cuenta</h2>
        <div className="flex flex-wrap gap-5 justify-center w-full mt-8 mb-8">
            <Input
                label='Titular de la cuenta:'
                placeholder='Nombre del titular'
                state={ type }
                type='text'
                register={ register("user.name")}
            />
            <Select
                label={`Puesto en ${ process.env.NEXT_PUBLIC_APP_NAME }`}
                placeholder='Selecciona un puesto'
                items={ positions }
                name='name'
                state={ type }
                value={ getValues("user.position_id")}
                setValue={ setValue }
            />
            <Input
                label='Correo electrónico:'
                placeholder='Correo electrónico'
                state={ type }
                type='email'
                register={ register("user.email")}
            />
            <Input
                label='Número telefónico:'
                placeholder='(+52) Número telefónico'
                state={ type }
                type='text'
                register={ register("user.cellphone")}
            />
        </div>

        <div className="flex mt-16 w-full justify-between pb-2 items-start">
            <span className={`text-sm active-since ${ type === 'new' ? 'hidden' : 'flex' }`}>Activo desde 23/09/2023</span>
            <span className={`text-sm active-since ${ type === 'update' ? 'hidden' : 'flex' }`}></span>
            <div className='flex gap-x-2'>
                <Button text='Cancelar' type='button'/>
                <Button disabled text='Guardar' type='submit'/>
            </div>
        </div>
    </form>
  )
}
