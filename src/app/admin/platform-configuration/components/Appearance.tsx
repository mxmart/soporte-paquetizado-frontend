'use client'
import { UploadImage } from "@/components/UploadImage";
import React from "react";
import { useForm } from "react-hook-form";

export const Appearance = () => {

    const { register, setValue, getValues, reset, handleSubmit, watch } = useForm<any>({ });


    return(
        <div className="px-4 py-8 flex flex-col gap-9">
            <div className="flex ">
                <h2 className='text-24 text-sm font-bold text-center md:text-start'>Selección de tema:</h2>
                <div></div>
            </div>
            <div className="flex flex-col gap-5">
                <h2 className='text-24 text-sm font-bold text-center md:text-start'>Selección de imagen de inicio de sesión:</h2>
                <UploadImage name="" setValue={setValue} state="new" text="Seleccione una imagen de 1920px por 700px" configuration/>
            </div>
            <div className="flex flex-col gap-5">
                <h2 className='text-24 text-sm font-bold text-center md:text-start'>Selección de logotipo:</h2>
                <UploadImage name="" setValue={setValue} state="new" text="Seleccione una imagen de 1920px por 700px" configuration/>
            </div>

        </div>
    )
}