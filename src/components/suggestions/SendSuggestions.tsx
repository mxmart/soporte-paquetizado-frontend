'use client'
import React from "react";
import { Button, Input } from "..";
import { useForm } from "react-hook-form";
import { UploadFiles } from "../ticket-form/UploadFiles";

export const SendSuggestions = () => {

    const {register}= useForm();
    return(
        <div className="flex flex-wrap gap-5 justify-center w-full mt-8">
            <Input
                label='¿Tiene alguna sugerencia para mejorar la plataforma?'
                placeholder='Escriba sus comentarios y sugerencias'
                state='new'
                type='textarea'
                edit={true}
                register={register}
            />
            <UploadFiles/>
            <div className="flex items-end mt-10 w-full justify-end gap-x-2 pb-2">
                <Button text='Cancelar' type='button'/>
                <Button disabled text='Guardar' type='submit'/>
            </div>
        </div>
    )
}