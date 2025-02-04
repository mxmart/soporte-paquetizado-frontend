'use client';
import { formatDate } from '@/helpers';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import React from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { TicketInformationForm } from './TicketInformationForm';

interface Props {
  userType: "admin" | "customer";
  isTicketOpen: boolean;
  userInTicket: boolean;
  ticketStatus: number;
};

export const TicketInformation = ({ userType, isTicketOpen, userInTicket, ticketStatus }: Props) => {

    const { toggle, isOpen } = useToggle();

  return (
    <div className={`order-1 lg:order-2 w-full lg:w-[450px] box rounded-lg mb-5 lg:mb-0 p-4 transition-all  ${ isOpen ? 'h-auto lg:max-h-[650px] lg:h-auto' : 'h-20 lg:max-h-[650px] lg:h-auto ' }`}>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className='w-full flex items-center flex-row text-[13px] justify-center'>
          <Image
            src={ '/images/User_image_default.png' }
            alt='User Image Soporte'
            width={ 50 }
            height={ 50 }
            className='rounded-full mr-2 w-10 h-10 object-contain bg-white'
          />
          <div className='flex flex-col items-center justify-start w-full ticket-creator'>
            <div className='flex flex-row w-full items-center'>
              <span className='font-bold'>Admin &nbsp;</span> <span>generó este ticket</span>
            </div>
            <span className='text-[13px] w-full ticket-date'>{ formatDate( new Date() ) }</span>
          </div>
          <button 
            onClick={ toggle } 
            className={`${ isOpen ? 'rotate-180' : 'rotate-360' } transition-all text-lg flex items-center justify-center lg:hidden`}
          >
            <FiChevronDown/>
          </button>
        </div>
        <div className={`${ isOpen ? 'block' : 'hidden lg:block' } w-full mt-3`}>
          <TicketInformationForm
            isTicketOpen={ isTicketOpen }
            ticketStatus={ 1 }
            userInTicket={ userInTicket }
            userType={ userType }
          />
        </div>
      </div>
    </div>
  )
}
 