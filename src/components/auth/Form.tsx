'use client';
import useToggle from '@/hooks/useToggle';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { useFormStatus } from 'react-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

interface Props {
    setPassword: Dispatch<SetStateAction<string>>;
    setEmail: Dispatch<SetStateAction<string>>;
    email: string;
    password: string;
};

export const Form = ({ email, password, setEmail, setPassword }: Props) => {

    const { isOpen, toggle } = useToggle();
    const { pending } = useFormStatus();

  return (
    <>
    <label className="text-sm">Correo electrónico o nombre de usuario:</label>
    <input
        className={`shadow-lg rounded-lg h-11 w-full focus:outline-none placeholder:text-sm px-4 mt-1 mb-5`}
        onChange={ e => setEmail(e.target.value) }
        value={ email }
        type="email"
        name="email"
        placeholder="Insertar correo o nombre de usuario"
      />

    <label className="text-sm">Contraseña:</label>
    <div className="relative ">
        <input
          className={`shadow-lg rounded-lg h-11 w-full focus:outline-none placeholder:text-sm px-4 mt-1 mb-5`}
          type={`${isOpen ? "text" : "password"}`}
          name="password"
          placeholder="Insertar contraseña"
          onChange={ e => setPassword(e.target.value) }
          value={ password }
        />
        {isOpen ? (
          <RiEyeLine
            onClick={toggle}
            className="absolute right-5 top-4 cursor-pointer text-[#E0E0E0] text-xl"
          />
        ) : (
          <RiEyeOffLine
            onClick={toggle}
            className="absolute right-5 top-4 cursor-pointer text-[#E0E0E0] text-xl"
          />
        )}
    </div>
    <div className="flex flex-col w-full">
        <Link className="text-sm hover:underline" href={"/auth/reset-password"}>
            ¿Olvidó su contraseña?
        </Link>
        <button 
            disabled={ pending || email.length === 0 || password.length === 0 }
            className="button ms-auto px-4 py-2 mt-10 rounded-lg"
            type="submit"
        >
            Iniciar sesión
        </button>
    </div>
    </>
  )
}
