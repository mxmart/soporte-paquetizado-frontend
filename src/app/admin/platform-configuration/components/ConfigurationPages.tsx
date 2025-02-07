'use client'
import { Box, Tab } from '@/components'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { AppearancePage } from './AppearancePage';
import { AssignmentPage } from './AssignmentPage';

export const ConfigurationPages = () => {

    const params = useSearchParams();
    const selectedPage = params.get("tab");

  return (
    <>
    <div className="w-full rounded-t-lg flex flex-col sm:flex-row items-center text-sm h-auto sm:h-10 tab-background">
        <Tab 
            active={ selectedPage === null || selectedPage === 'configuration' && true } 
            text='Apariencia general' 
            url='/admin/platform-configuration?tab=configuration'
        />
        <Tab
            active={ selectedPage === 'assignment' && true } 
            text='Asignación automática de tickets' 
            url='/admin/platform-configuration?tab=assignment'
        />
    </div>
    <div className="flex flex-row w-full gap-x-4">
        <Box withTabs>
            <div className="px-2 md:px-8 w-full pt-8">
                { selectedPage === null             && <AppearancePage/> }
                { selectedPage === 'configuration'  && <AppearancePage/> }
                { selectedPage === 'assignment'     && <AssignmentPage/> }
            </div>
        </Box>
    </div>
    </>
  )
}
