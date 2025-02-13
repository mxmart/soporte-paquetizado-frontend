"use client";
import { useNotificationsStore } from "@/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const FilterNotifications = () => {

  const searchParams = useSearchParams();
  const pageString = searchParams.get('page');

  const [readed, setReaded] = useState(true);
  const [unreaded, setUnreaded] = useState(true);

  const getNotifications = useNotificationsStore( store => store.getNotifications );

  const onGetNotifications = async( page: string, filter: "all" | "readed" | "unreaded" ) => {
    await getNotifications( page, filter );
  };

  useEffect(() => {
    let filter: "all" | "readed" | "unreaded" = "all";
    if( readed && unreaded ) filter = "all";
    if( readed && !unreaded ) filter = "readed";
    if( !readed && unreaded ) filter = "unreaded";
    if( !readed && !unreaded ) filter = "all";  
    onGetNotifications( pageString || "1", filter );
  }, [ pageString, readed, unreaded ]);

  return (
    <div className="flex justify-center md:justify-between w-full lg:w-[90%] m-auto my-3 headers">
      <p className="font-semibold text-sm hidden md:block">
        Más recientes:
      </p>
      <div className="flex gap-4 items-center">
        <p className="font-semibold text-sm">Mostrar:</p>
        <div className="flex gap-2 items-center"> 
          <input
            className="w-4 h-4"
            type="checkbox"
            checked={readed}
            onChange={() => setReaded(!readed)}
            style={{ boxShadow: "none", accentColor: "#58819A" }}
          />
          <p className="text-xs font-medium filter-color">Leído</p>

          <input
            className="w-4 h-4"
            type="checkbox"
            checked={unreaded}
            onChange={() => setUnreaded(!unreaded)}
            style={{ boxShadow: "none", accentColor: "#58819A" }}
          />
          <p className="text-xs font-medium filter-color">No leído</p>
        </div>
      </div>
    </div>
  );
};
