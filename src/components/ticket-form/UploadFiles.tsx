'use client';
import React, { RefObject, useRef, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';

export const UploadFiles = () => {

    const inputRef: RefObject<HTMLInputElement> = useRef<any>(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onArchiveChange = async (e: any) => {
        
    };

  return (
    <div className='flex flex-col w-full md:px-14 px-3 md:justify-start upload-files'>
        <span className={`${ selectedFiles.length > 0 ? 'flex' : 'hidden'} text-sm`}>Archivos adjuntos:</span>
        <div className={`${ selectedFiles.length > 0 ? 'flex mt-3' : 'hidden' } w-full flex-wrap gap-2`}>

        </div>
        <div className='flex justify-center md:mr-auto'>
            <button onClick={() => inputRef.current!.click()} type='button' className='text-21 text-sm font-medium text-start w-full mt-3 flex items-center gap-x-2 hover:underline'>
              <RiAddFill />
              Adjuntar archivo
            </button>
            <input
                className="h-8 w-full cursor-pointer hidden"
                id="archive"
                type="file"
                ref={inputRef}
                onChange={onArchiveChange}
            />
        </div>
    </div>
  )
}
