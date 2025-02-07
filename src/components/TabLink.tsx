'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    text: string;
    url: string;
    active?: boolean;
};

export const TabLink = ({ active = false, text, url }: Props) => {

    const { push, prefetch } = useRouter();

  return (
    <button
      onMouseOver={ () => prefetch( url ) } 
      onClick={ () => push( url ) } 
      className={`w-auto h-10 transition-all duration-200 px-5 ${ active ? 'background-1  rounded-t-lg hover:background-1': " background-11 rounded-t-lg" }`}
    >
      { text }
    </button>
  )
}
