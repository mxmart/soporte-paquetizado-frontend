import React from "react";
import { Notification } from "./Notification";
import { FilterNotifications } from "./FilterNotifications";
import Link from "next/link";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";

export const Notifications = () => {
  return (
    <div className="notification flex flex-wrap gap-4 justify-center p-2">
        <FilterNotifications/>
        <Notification/>
        <Notification/>
        <Notification/>
    </div>
  );
};
