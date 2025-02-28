import { formatDate } from '@/helpers'
import Image from 'next/image'
import React from 'react'
import { File } from './File'
import { IMessage } from '@/interfaces'

interface Props { 
  message: IMessage 
};

export const MyMessage = ({ message }: Props) => {

  return (
    <div className="flex mb-3 mt-3 justify-end w-full px-2">
         <div className={`${ message.type !== 'TEXT' ? 'w-64' : 'w-64 md:w-[50%]' } mr-2 h-auto text-sm p-2 px-4 rounded-l-xl rounded-b-xl shadow message-text`}>
            <span className="font-semibold text-xs">{ message.send_by }</span> <br />
            {
              message.type !== 'TEXT'
              ? <File message={ message }/>
              : <p className="w-full mt-1 flex font-normal items-center py-3 break-words">{ message.content }</p>
            }
            <div className="flex justify-end text-xs">
                <span>{ formatDate( message.creation_date ) }</span>
            </div>
         </div>
        <Image
            src={ message?.profile_pic || '/images/User_image_default.png'}
            width={50}
            height={50}
            alt="User Message"
            className="w-10 h-10 object-contain rounded-full bg-white flex items-center justify-center"
        />
    </div>
  )
}
