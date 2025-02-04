'use client'
import Link from 'next/link';
import React from 'react'
import { BsFiletypePdf, BsFiletypePng, BsFiletypeJpg, BsFiletypeSvg, BsFiletypeDocx, BsFiletypePpt, BsFiletypeMp3, BsFiletypeMp4, BsFiletypeWav, BsFiletypeTxt, BsFiletypeXlsx } from 'react-icons/bs';
import { RiDownloadFill } from 'react-icons/ri';

interface Props {
    message: any;
};

export const File = ({ message }: Props) => {

    const fileContent: any = {
    'PDF':      { icon: <BsFiletypePdf/>,   title: 'Archivo PDF'              },
    'PNG':      { icon: <BsFiletypePng/>,   title: 'Imagen PNG'               },
    'JPG':      { icon: <BsFiletypeJpg/>,   title: 'Imagen JPG'               },
    'SVG':      { icon: <BsFiletypeSvg/>,   title: 'Imagen SVG'               },
    'DOCX':     { icon: <BsFiletypeDocx/>,  title: 'Documento DOCX'           },
    'PPTX':     { icon: <BsFiletypePpt/>,   title: 'Presentación PPT'         },
    'PPT':      { icon: <BsFiletypePpt/>,   title: 'Presentación PPT'         },
    'MP3':      { icon: <BsFiletypeMp3/>,   title: 'Audio MP3'                },
    'MP4':      { icon: <BsFiletypeMp4/>,   title: 'Video MP4'                },
    'WAV':      { icon: <BsFiletypeWav/>,   title: 'Audio WAV'                },
    'XLSX':     { icon: <BsFiletypeXlsx/>,  title: 'Hoja de cálculo XLSX'     },
    'JPEG':     { icon: <BsFiletypeJpg/>,   title: 'Imagen JPEG'              },
    'MPEG':     { icon: <BsFiletypeMp3/>,   title: 'Audio MPEG'               },
    };

  return (
    <div className='w-52 h-16 bg-[#F4F4F4] rounded-lg flex items-center justify-center px-2 flex-col p-1 mx-auto mt-2 mb-2'>
        <div className='flex w-52 items-center justify-between px-3'>
            <span className='text-2xl text-gray-600 mr-3'>
                { fileContent[message.type?.toUpperCase()]?.icon }
            </span>
            <div className='flex flex-col w-full mb-1 items-start'>
                <span className='text-xs font-medium text-gray-600'>
                    { fileContent[message.type?.toUpperCase()]?.title }
                </span>
            </div>
            <Link
                target="_blank" 
                href={ message.content } 
                className="flex items-center justify-center text-lg text-gray-600"
            >
                <RiDownloadFill />
            </Link>
        </div>
    </div>
  )
}
