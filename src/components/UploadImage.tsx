'use client';
import { toBase64 } from '@/helpers';
import Image from 'next/image';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { MdUpload } from 'react-icons/md';

interface Props {
    image?: string;
    defaultImage?: string;
    text: string;
    edit?: boolean;
    state: "new" | "update";
    name: string;
    setValue: UseFormSetValue<any>;
    isSubmitted?: boolean;
    isReseted?: boolean;
    configuration?:boolean;
};

export const UploadImage = ({ defaultImage = '/images/User_image_default.png', image = '', text, edit = false, state, name, setValue, isReseted, isSubmitted, configuration = false }: Props) => {

    const [ imageData, setImageData ] = useState<{ name: string, image: string, default: string }>({ name: 'Seleccione un archivo', image: image, default: defaultImage });
    const [canUpdate, setCanUpdate] = useState<boolean>( edit );
    const inputRef: RefObject<HTMLInputElement> = useRef<any>(null);

    const onImageChange = async( event: React.ChangeEvent<HTMLInputElement> ) => {
        if( !canUpdate ) return;
        if( event.target.files![0] ) {
            const base64Image = await toBase64(event.target.files![0]) as string;
            setImageData({ name: event.target.files![0].name, image: base64Image, default: defaultImage });
            setValue!(`${ name }`, base64Image);
            event.target.value = '';
        };
    };
    
    useEffect(() => {
        setImageData({ name: 'Seleccione un archivo', image: image, default: defaultImage });
    }, [isSubmitted === true, isReseted === true ]);
    
    useEffect(() => {
        if( state === 'update' ) return setCanUpdate( edit );
        if( state === 'new' ) return setCanUpdate( true );
    }, [ edit ]);

  return (
    <div className={`flex flex-col md:flex-row w-full ${configuration ? "pl-4 pr-8 ":"max-w-72 lg:max-w-96"}  justify-center items-center md:justify-start gap-5 upload-image`}>
        <div className={`${configuration ? " w-96":"w-24"}  h-24 rounded-lg flex flex-wrap items-center justify-center overflow-hidden shadow`}>
            <Image
                className={`rounded-xl object-contain h-full w-full`}
                src={ imageData.image || imageData.default }
                width={ 100 } 
                height={ 100 }
                alt={"Logo Empresa"} 
            />
        </div>
        <div className={`flex flex-col justify-evenly ${configuration ? " w-56 " :" "}`}>
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
