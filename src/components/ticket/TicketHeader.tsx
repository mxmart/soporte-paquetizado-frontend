import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    title: string;
    image?: string;
    type: "customer" | "admin";
    company_id?: number;
};

export const TicketHeader = ({ title = 'Titulo del dashboard', image = '', type, company_id }: Props) => {

    const pathName = type === "admin" ? `/admin/company/${ company_id }` : `/dashboard/company/${ company_id }`

  return (
    <>
    <div className={`flex items-center w-full h-20 rounded-b-none border-[#85858529] box rounded-xl mb-4 ticket-header`}>
        <div className='flex items-center md:justify-between justify-center ms-6 mr-6 w-full'>
            <p className="text-2xl font-medium text-center">{ title.length > 21 ? title.substring(0,25)+"..." : title }</p>
            <Link href={ pathName } className=" h-20 w-20 rounded-lg logo md:flex flex-wrap items-center justify-center py-1 hidden">
            {
                image && (
                <Image
                    src={ image || '/images/User_image_default.png' }
                    width={ image ? 70 : 100 }
                    height={ image ? 70 : 100 }
                    alt='Logo empresa Mxmart Solutions'
                    className='rounded-lg object-contain object-center w-full h-full'
                />
                )
            }
            </Link>
        </div>
    </div>
    </>
  )
}
