'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Select } from '../inputs/Select';
import { UploadImage } from '../UploadImage';
import { RoleSelector } from './RoleSelector';
import { Button } from '../Button';
import { IUser } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFormControl } from '@/hooks';
import { userFormValidator } from '@/validators';
import { createAccount, getPositions, getRoles, updateProfileInformation } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { activeSince, areObjectsEqual } from '@/helpers';
import { RiPencilFill } from 'react-icons/ri';
import { toast } from 'sonner';

interface Props {
    type: 'new' | 'update';
    userType: 'admin' | 'customer';
    user: IUser;
};

type Inputs = {
    user: IUser
};

export const UserForm = ({ type, userType, user }: Props) => {

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { refresh } = useRouter();
    const { update } = useSession();
    
    const { data: positions, isLoading: isLoadingPositions } = useQuery({ queryKey: ['positions'], queryFn: getPositions });
    const { data: roles, isLoading: isLoadingRoles } = useQuery({ queryKey: ['roles'], queryFn: () => getRoles({ type: 'admin' })});
    
    const { register, setValue, getValues, reset, handleSubmit } = useForm<Inputs>({ defaultValues: { user }});
    const { handleReset, setEdit, isReseted, edit, currentValues } = useFormControl({ values: user, reset, setValue, name: 'user' });
 
    const onSubmit: SubmitHandler<Inputs> = async({ user }) => {
        
        const currentUser = currentValues;
        const isEquals = areObjectsEqual( currentUser, user );
        if( isEquals ) return toast('No se han realizado cambios');
        
        try {

            setIsSubmitted( true );
            if( !await userFormValidator({ user, currentUser })) return setIsSubmitted( false );

            if( type === 'new' ){
                await createAccount({ user });
                handleReset();
            }; 

            if( type === "update" ){
                const profile_picture = await updateProfileInformation({ user });
                if( profile_picture === null ){
                    await update({ ...user });
                } else {
                    await update({ ...user, profile_picture });
                    refresh();
                };
            };

            setEdit( false );
            setIsSubmitted( false );

        } catch (error) {

            console.log(error);
            setEdit(false);
            setIsSubmitted( false );

        };
    };

    useEffect(() => {
        setValue("user.position_id", user.position_id);
        setValue("user.role_id", user.role_id);
    }, [user]);

  return (
    <form onSubmit={handleSubmit( onSubmit )} className="w-full h-auto p-2 rounded-lg user-form">
        
        <button onClick={ () => setEdit( !edit ) } type='button' className={`button items-center mb-4 md:mb-0 md:mx-0 mx-auto md:ms-auto rounded-lg px-2 py-2 text-xs gap-x-1 ${ type === 'update' && !edit ? 'flex' : 'hidden' }`}>
            <RiPencilFill />
            Actualizar información
        </button>

        <div className="flex flex-wrap gap-5 justify-center w-full mt-4 mb-10 items-start">
            <UploadImage
                text='Imagen de perfil:'
                name='user.profile_picture'
                setValue={ setValue }
                image={ getValues("user.profile_picture")} 
                isSubmitted={ isSubmitted }
                isReseted={ isReseted }
                edit={ edit }
                state={ type }
            />
            <RoleSelector
                state={ type }
                label='Rol en la plataforma:'
                placeholder='Seleccione un rol'
                name='user.role_id'
                value={ getValues("user.role_id")}
                isReseted={ isReseted }
                setValue={ setValue }
                items={ roles || []}
                isLoading={ isLoadingRoles }
            />
        </div>

        <h2 className='text-center xl:text-start text-primary text-[13px] font-semibold md:px-5 px-3 mt-10'>Información de la cuenta</h2>
        <div className="flex flex-wrap gap-5 justify-center w-full mt-8 mb-8">
            <Input
                label='Titular de la cuenta:'
                placeholder='Nombre del titular'
                type='text'
                register={ register("user.account_holder")}
                edit={ edit }
                state={ type }
            />
            <Select
                label={`Puesto en ${ process.env.NEXT_PUBLIC_APP_NAME }`}
                placeholder='Selecciona un puesto'
                name='user.position_id'
                value={ getValues("user.position_id")}
                setValue={ setValue }
                isReseted={ isReseted }
                items={ positions || [] }
                isLoading={ isLoadingPositions }
                state={ type }
                edit={ edit }
            />
            <Input
                label='Correo electrónico:'
                placeholder='Correo electrónico'
                type='email'
                register={ register("user.email")}
                edit={ edit }
                state={ type }
            />
            <Input
                label='Número telefónico:'
                placeholder='(+52) Número telefónico'
                type='text'
                register={ register("user.cellphone")}
                edit={ edit }
                state={ type }
            />
        </div>

        <div className="flex mt-16 w-full justify-between pb-2 items-start">
            <span className={`text-sm active-since ${ type === 'new' ? 'hidden' : 'flex' }`}>Activo desde { activeSince(user?.creation_date)}</span>
            <span className={`text-sm active-since ${ type === 'update' ? 'hidden' : 'flex' }`}></span>
            <div className={`${ type === "update" && !edit ? 'hidden' : 'flex' } gap-x-2`}>
                <Button disabled={ isSubmitted } onClick={ handleReset } text='Cancelar' type='button'/>
                <Button disabled={ isSubmitted } text='Guardar' type='submit'/>
            </div>
        </div>
    </form>
  )
}
