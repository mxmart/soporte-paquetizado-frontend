'use client'
import { Table } from '@/components';
import { Column } from '@/interfaces';
import { getAdminAccounts } from '@/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export const ManageAccounts = () => {

    const { data: accounts, isLoading } = useQuery({ queryKey: ['admin-accounts'], queryFn: getAdminAccounts });

    const columns: Column[] = [
        { header: 'ID',                     accessorKey: 'id'                   },
        { header: 'Titular de la cuenta',   accessorKey: 'account_holder'       },
        { header: 'Puesto en Mxmart',       accessorKey: 'description'          },
        { header: 'Email',                  accessorKey: 'email'                },
        { header: 'Número',                 accessorKey: 'cellphone'            },
        { header: 'Rol en la plataforma',   accessorKey: 'label'                },
    ];

  return (
    <Table
        columns={ columns } 
        filters
        url={`/admin/update-admin/`}
        values={ accounts || [] }
        isLoading={ isLoading }
        text="No se encuentra ningún administrativo"
    />
  )
}
