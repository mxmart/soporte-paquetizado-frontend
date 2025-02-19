import { formatDate } from '@/helpers'
import { IMessage } from '@/interfaces'
import React from 'react'

interface Props {
  message: IMessage
};

export const Event = ({ message }: Props) => {

  return (
    <div className="w-full flex p-2 items-baseline justify-between mb-5 event">
        <div className="w-[85%] h-[0.5px] mb-4 line"/>
        <div className="flex items-center w-full justify-center mx-auto flex-col">
            <span className="w-full text-xs font-[600] text-center md:px-1">
                { message.content }
            </span>
            <div className="flex justify-end text-xs items-center">
                <span>{ formatDate( message.creation_date ) }</span>
            </div>
        </div>
        <div className="w-[85%] h-[0.5px] mb-4 line"/>
    </div>
  )
}
