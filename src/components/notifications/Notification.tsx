"use client";
import { calculateTimeSince } from "@/helpers";
import { INotification } from "@/interfaces";
import { useNotificationsStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdEye } from "react-icons/io";

interface Props {
    notification: INotification;
};

export const Notification = ({ notification }: Props) => {

    const { push, prefetch } = useRouter();
    const [readed, setReaded] = useState( notification.readed );
    const setNotificationsCount = useNotificationsStore( state => state.setNotificationsCount );
    const unreadedNotifications = useNotificationsStore( state => state.unreadedNotifications );

    const handleNotification = async() => {
      const url = notification.url;
      if( url ) { push( url ) };
      if( readed ) return;
      setNotificationsCount( unreadedNotifications - 1 );
      setReaded( true );
      // readNotification({ notification_id: String(notification!.id) });
    };

  return (
    <div 
        onMouseEnter={ () => prefetch( notification.url || '/' ) }
        className="relative notification-card py-3 px-3 md:px-6 rounded-md flex flex-wrap w-full lg:w-[90%] m-auto gap-2 sm:gap-4 xl:gap-8 cursor-pointer"
        onClick={ handleNotification }
        key={notification.id} 
    >
    <div className="cursor-pointer">
      <Image 
        src={"/images/evolvenx_icon.png"}
        alt={""}
        width={50}
        height={50}
        className="notification-img rounded-full shadow-lg p-1"
        />
      </div>

      <div className="w-9/12 sm:w-10/12 cursor-pointer">
        <span className="notification-info text-sm">
            {notification.notification_text}
        </span>
        <div className="flex flex-col sm:flex-row text-xs font-extralight gap-2 md:gap-4">
          <p className="font-normal text-xs notification-info">
            {calculateTimeSince( new Date(notification.creation_date) )}
          </p>
          <div className="flex items-center gap-0.5">
            <GoDotFill className={`${ readed ? "seen" : "not-seen"} text-lg`} />
            <p className="font-normal text-xs not-seen">
                { readed ? "Leída por usted" : "No leída por usted"}
            </p>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <IoMdEye className={`${ notification.readby ? "seen" : "not-seen"} text-base`} />
            <p className="font-normal text-xs not-seen">
            Vista por:{" "}
              {notification.readby
                ? notification.readby
                : "Nadie"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 