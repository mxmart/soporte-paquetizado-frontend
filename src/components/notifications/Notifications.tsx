'use client'
import React from "react";
import { Notification } from "./Notification";
import { FilterNotifications } from "./FilterNotifications";
import { useNotificationsStore } from "@/store";
import { NotificationSkeleton } from "./NotificationSkeleton";
import { Pagination } from "../Pagination";

export const Notifications = () => {

  const totalNotifications = useNotificationsStore( store => store.totalNotifications );
  const notifications = useNotificationsStore( store => store.notifications );
  const isLoadingNotifications = useNotificationsStore( store => store.isLoadingNotifications );

  return (
    <div className="notification">
      <FilterNotifications/>
      <div className="flex flex-wrap gap-4 justify-center p-2">
        {
          isLoadingNotifications
          ? <NotificationSkeleton/>
          : notifications?.length === 0 || !notifications
          ? <div className="w-full p-3 h-44 flex items-center justify-center notification-card rounded-lg">
              <span className="notification-info font-medium">No hay notificaciones</span>
          </div>
          : ( notifications?.map(( notification ) => {
            return (
              <Notification
                key={ notification.id }
                notification={notification}
              />
            );
          }))
        }
      </div>
      <Pagination
        minItems={10}
        totalItems={ totalNotifications }
        itemsInPage={ notifications?.length }
      />
    </div>
  );
};
