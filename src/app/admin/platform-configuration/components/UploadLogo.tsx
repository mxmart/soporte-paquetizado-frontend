'use client'
import { IsLoadingLogo } from '@/components/header/IsLoadingLogo';
import { toBase64 } from '@/helpers';
import { uploadLogo } from '@/services';
import { useConfigurationStore } from '@/store/ConfigurationStore';
import Image from 'next/image';
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { MdUpload } from 'react-icons/md';

interface Props {
    image?: string; 
    defaultImage?: string;
    name: string;
    isLoading?: boolean;
    setValue: UseFormSetValue<any>;
};

export const UploadLogo = ({ defaultImage = '/images/evolvenx_not.png', image = '', setValue, name, isLoading }: Props) => {

    const [ imageData, setImageData ] = useState<{ name: string, image: string, default: string }>({ name: 'Seleccione un archivo', image: image, default: defaultImage });
    const inputRef: RefObject<HTMLInputElement> = useRef<any>(null);

    const setLogo = useConfigurationStore( state => state.setLogo );

    const onImageChange = async( event: React.ChangeEvent<HTMLInputElement> ) => {
        if( event.target.files![0] ) {
            const base64Image = await toBase64(event.target.files![0]) as string;
            setImageData({ name: event.target.files![0].name, image: base64Image, default: defaultImage });
            setValue!(`${ name }`, base64Image);
            event.target.value = '';

            await uploadLogo({ file: base64Image });
            setLogo( base64Image );
            //TODO: Peticion al back para actualizar el logo
            //TODO: Actualizar el estado global para mostrar el logo
        };
    };

    useEffect(() => {
        setImageData({ name: 'Seleccione un archivo', image: image, default: defaultImage });
    }, [ isLoading ]);
    
  return (
    <>
    <h2 className='text-center xl:text-start text-[13px] font-semibold mt-10'>Selección de logotipo:</h2>
    <div className="flex flex-col md:flex-row w-full lg:max-w-[450px] justify-center items-center md:justify-start gap-5 upload-image mt-3 p-4">
        <div className={`w-80 h-24 rounded-lg flex flex-wrap items-center justify-center overflow-hidden shadow`}>
            {
                isLoading
                ? <IsLoadingLogo/>
                : <Image
                    className={`rounded-xl object-contain h-full w-full`}
                    src={ imageData.image || imageData.default }
                    width={ 100 } 
                    height={ 100 }
                    alt={"Logo Portada"} 
                />
            }
        </div>
        <div className="flex flex-col justify-evenly">
            <label className={`text-xs font-medium mb-2 text-center md:text-start`}>
                Seleccione una imagen de 1920px x 700px
            </label>
            <div onClick={ () => inputRef.current?.click() } className={`w-48 h-8 mx-auto rounded-lg flex items-center justify-between cursor-pointer px-3 font-normal shadow`}>
                <span 
                    className={` text-xs`} 
                    style={{ border: 'none' }}
                >
                    { image === '' ? 'Seleccione un archivo' : imageData.name  }
                </span>
                <button type='button' className={`w-6 h-6 text-sm rounded-full items-center justify-center flex`}>
                    <MdUpload/>
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
    </>
  )
}
