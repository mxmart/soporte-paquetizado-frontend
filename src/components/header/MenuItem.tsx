'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    title: string;
    callback: () => void;
    href: string;
    permission: string;
};

export const MenuItem = ({ callback, href, title }: Props) => {

    const { push } = useRouter();

    const onClickOption = ( option: any ) => {
        push( option.href );
        option.callback();
    };

  return (
    <>
    <span className='hover:underline' onClick={ () => onClickOption({ href, callback }) } key={ title }>{ title }</span>
    </>
  )
}
