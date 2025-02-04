'use client';
import React, { ReactNode } from 'react'

interface Props {
    icon?: ReactNode;
    title?: string;
    responsiveTitle?: string;
    url?: string;
    index: number;
    callback?: () => void;
};

const sticky: { [key: number]: string } = {
    0: 'top-[140px]',
    1: 'top-[212px]',
    2: 'top-[284px]',
    3: 'top-[356px]',
};

export const Option = ({ icon, title, url, responsiveTitle, index, callback }: Props) => {
  return (
    <div className={`option h-[70px] lg:h-[60px] p-2 pl-4 rounded-lg w-full flex items-center justify-center lg:sticky ${ sticky[index] }`}>

    </div>
  )
}
