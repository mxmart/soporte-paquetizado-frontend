'use client';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    confirmationCode: string;
    username: string;
};

export const ConfirmSignInForm = () => {

    const { register, handleSubmit } = useForm<Inputs>();
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const { push } = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async({ confirmationCode }: any) => {

        const email = getCookie('email');

        try {
            
        } catch (error) {
            
        }
    };
 
    const handleCancel = () => push("/auth/login");

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full mt-10">
        <label>Ingrese su código de confirmación:</label>
        <input
          { ...register("confirmationCode", { required: true }) }
          className="shadow-lg rounded-lg h-11 w-full focus:outline-none placeholder:text-sm px-4 mt-2 mb-5"
          type="text"
          placeholder="Código de confirmación"
        />

        <div className="flex w-full justify-end gap-x-3">
            <button
                type='button'
                onClick={ handleCancel }
                className="button px-4 py-2 mt-10 rounded-lg"
            >
                Cancelar
            </button>
            <button
                disabled={ isSubmitted }
                type="submit"
                className="px-4 py-2 mt-10 rounded-lg button"
            >
                Continuar
            </button>
        </div>
    </form>
  )
}
