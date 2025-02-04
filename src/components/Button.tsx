'use client';
import React from 'react'

interface Props {
    disabled?: boolean;
    text: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    style?: "text" | "normal";
    className?: string;
    hidden?: boolean;
    icon?: React.ReactNode;
};

export const Button = ({ text, type, onClick, disabled, style = 'normal', className, icon, hidden = false }: Props) => {

  return (
    <>
    {
      style === 'normal'
      ? <button onClick={ onClick } disabled={ disabled } className={`${ hidden === true ? 'hidden' : 'flex' } button px-4 text-sm py-2 text-white rounded-lg`} type={ type }>{ text }</button>
      : <button onClick={ onClick } disabled={ disabled } className={`${ hidden === true ? 'hidden' : 'flex' } text-21 text-sm font-medium text-start w-full mt-2 items-center gap-x-2 hover:underline mb-4`} type={ type }>{icon}{ text }</button>
    }
    </>

  )
}
