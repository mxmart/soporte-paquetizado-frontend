'use client'
import { Select } from "@/components";
import React from "react";
import { useForm } from "react-hook-form";


export const TicketAssigmentForm = () =>{

        const { register, setValue, getValues, reset, handleSubmit, watch } = useForm<any>();
    

    return(
        <div className="flex m-8 justify-center gap-6">
            <Select
                label={`Asiganción automática de tickets`}
                placeholder='Agregue usuarios'
                name=''
                value={ getValues("")}
                setValue={ setValue }
                items={   [] }
                state={ "new" }
                edit
            />
            <Select
                label={`Aviso de nuevos tickets`}
                placeholder='Agregue usuarios'
                name=''
                value={ getValues("")}
                setValue={ setValue }
                items={   [] }
                state={ "new" }
                edit
            />
        </div>
    )

}