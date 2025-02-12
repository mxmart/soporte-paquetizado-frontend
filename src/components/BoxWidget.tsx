'use client'

import { IUserStats } from '@/interfaces';
import { useNotificationsStore } from '@/store';
import React from 'react'

interface Props {
    BoxItems?: IUserStats;
    type: 'admin' | 'customer';
}
 
export const BoxWidget = ({ BoxItems, type }: Props) => {

    const notifications = useNotificationsStore( store => store.unreadedNotifications );

    return (
        <div className='w-full mb-10'>
            <h2 className='section-title text-sm text-center md:text-start'>Estadísticas mensuales:</h2>
            <div className='boxWidget flex flex-wrap gap-2 mt-4 items-center justify-center'>

                <div className={`card1 w-[150px] md:w-44 px-2 py-5 flex  flex-col items-center gap-2 rounded-lg `}>
                    <p className='text-lg md:text-3xl'>{ type === 'admin' ? BoxItems?.attended_clients || 0 : BoxItems?.attended_hours || 0 }</p>
                    <p className='text-xs text-center'>{ type === 'admin' ? 'Clientes atendidos' : 'Horas atendidas' }</p>
                </div>
                
                <div className={`card2 w-[150px] md:w-44 px-2 py-5 flex  flex-col items-center gap-2 rounded-lg `}>
                    <p className='text-lg md:text-3xl'>{ BoxItems?.open_tickets || 0 }</p>
                    <p className='text-xs text-center'>Ticket abiertos</p>
                </div>

                <div className={`card3 w-[150px] md:w-44 px-2 py-5 flex  flex-col items-center gap-2 rounded-lg `}>
                    <p className='text-lg md:text-3xl'>{ BoxItems?.attended_tickets || 0 }</p>
                    <p className='text-xs text-center'>Tickets atendidos</p>
                </div>

                <div className={`card4 w-[150px] md:w-44 px-2 py-5 flex  flex-col items-center gap-2 rounded-lg `}>
                    <p className='text-lg md:text-3xl'>{ notifications || 0 }</p>
                    <p className='text-xs text-center'>Notificaciones</p>
                </div>

            </div>
        </div>
    )
}