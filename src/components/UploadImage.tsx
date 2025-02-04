'use client';
import Image from 'next/image';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { MdUpload } from 'react-icons/md';

interface Props {
    image?: string;
    defaultImage?: string;
    text: string;
    edit?: boolean;
    state: "new" | "update";
};

export const UploadImage = ({ defaultImage = '/images/User_image_default.png', image = '', text, edit = false, state }: Props) => {

    const [ imageData, setImageData ] = useState<{ name: string, image: string, default: string }>({ name: 'Seleccione un archivo', image: image, default: defaultImage });
    const [canUpdate, setCanUpdate] = useState<boolean>( edit );
    const inputRef: RefObject<HTMLInputElement> = useRef<any>(null);

    useEffect(() => {
        if( state === 'update' ) return setCanUpdate( edit );
        if( state === 'new' ) return setCanUpdate( true );
    }, [ edit ]);

    const onImageChange = async( event: React.ChangeEvent<HTMLInputElement> ) => {};

  return (
    <div className="flex flex-col md:flex-row w-full max-w-72 lg:max-w-80 justify-center items-center md:justify-start gap-5 upload-image">
        <div className={`w-24 h-24 rounded-lg flex flex-wrap items-center justify-center overflow-hidden shadow`}>
            <Image
                className={`rounded-xl object-contain h-full w-full`}
                src={ imageData.image || imageData.default }
                width={ 100 } 
                height={ 100 }
                alt={"Logo Empresa"} 
            />
        </div>
        <div className="flex flex-col justify-evenly">
            <label className={`text-sm font-semibold mb-2 text-center md:text-start`}>{ text }</label>
            <div onClick={ canUpdate ? () => inputRef.current?.click() : () => {} } className={`w-52 h-8 rounded-lg flex items-center justify-between ${ canUpdate && 'cursor-pointer' } px-3 font-normal shadow`}>
                <span 
                    className={` text-xs`} 
                    style={{ border: 'none' }}
                >
                    { image === '' ? 'Seleccione un archivo' : imageData.name  }
                </span>
                <button type='button' className={`w-6 h-6 text-sm rounded-full items-center justify-center flex`}>
                    <MdUpload />
                </button>
            </div>
            <input
                className={`h-8 w-full cursor-pointer hidden`}
                type="file"
                ref={ inputRef }
                onChange={ onImageChange }
                accept=".png, .jpg"
            />
        </div>
    </div>
  )
}
