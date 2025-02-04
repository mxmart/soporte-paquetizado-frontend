'use client'
import Image from "next/image"
import React from "react"
import { GoDotFill } from "react-icons/go"
import { IoMdEye } from "react-icons/io"


export const Notification = ()=>{
    
    return(
        <div className="relative notification-card py-3 px-3 md:px-6 rounded-md flex flex-wrap w-full lg:w-[90%] m-auto gap-2 sm:gap-4 xl:gap-8 cursor-pointer">
                <Image src={"/images/evolvenx_icon.png"} alt={""} width={50} height={50} className="notification-img rounded-full shadow-lg p-1"/>
            
            <div className="w-9/12 sm:w-10/12">
                <label className="notification-info text-sm">Se ha asignado un agente a su ticket de tipo [Tipo de ticket]</label>
                <div className="flex flex-col sm:flex-row text-xs font-extralight gap-2 md:gap-4">
                    <p className="font-normal text-xs notification-info">Hace tiempo [#] [Temporalidad]</p>
                    <div className="flex items-center gap-0.5">
                        <GoDotFill className={`text-[#C4C4C4] text-lg`}/>
                        <p className="font-normal text-xs not-seen">No leída por usted</p>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        <IoMdEye className={`not-seen text-base`}/>
                        <p>Vista por: Nadie</p>
                    </div>
                </div>
            </div>
        </div>
    )

}