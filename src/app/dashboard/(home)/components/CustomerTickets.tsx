"use client";
import { Table } from '@/components';
import { Column, ICustomerTicket } from '@/interfaces';
import React, { useEffect } from 'react'

export const CustomerTickets = () => {



  const columns: Column[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Tipo", accessorKey: "type" },
    { header: "Titulo", accessorKey: "title" },
    { header: 'Status',               accessorKey: 'ticket_status'      },
    { header: "Creado por", accessorKey: "created_by" },
    { header: "Fecha de apertura", accessorKey: "creation_date" },
  ];

const data :ICustomerTicket[]= [
{ type :"tipo 1",title: "titulo 1",ticket_status: "estatus 1", created_by:"creado por 1", creation_date:"fecha 1"},
{ type :"tipo 2",title: "titulo 2",ticket_status: "estatus 2", created_by:"creado por 2", creation_date:"fecha 2"},
{ type :"tipo 3",title: "titulo 3",ticket_status: "estatus 3", created_by:"creado por 3", creation_date:"fecha 3"},
]

  return (
    <>
        <div className='mb-8'>
            <h2 className='section-title text-sm font-bold text-center md:text-start'>Tickets abiertos:</h2>
            <Table
                columns={ columns } 
                url={`/`}
                values={ data }
                />
        </div>
        <h2 className='section-title text-sm font-bold text-center md:text-start'>Tickets atendidos este mes:</h2>
        <Table 
            columns={columns}
            url={'/'}
            values={ data }
            />        
    </>
  )
}
