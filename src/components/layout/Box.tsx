import React from 'react'

interface Props {
    withTabs?: boolean;
    children: React.ReactNode;
    paddingBottom?: string;
};

export const Box = ({ withTabs = false, children, paddingBottom = 'pb-4' }: Props) => {
  return (
    <div className='w-full flex flex-col order-2 lg:order-1'>
        <div className={`box w-full ${ withTabs ? 'rounded-b-lg box-withTabs' : 'rounded-lg' }  h-auto overflow-y-auto ${ paddingBottom } no-scrollbar min-h-72`}>
            {children}
        </div>
    </div>
  )
}
