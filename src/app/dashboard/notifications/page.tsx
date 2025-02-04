import { Box, DashboardTitle, Notifications, Options } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cliente',
    description: `Notificaciones`,
    openGraph: {
        title: 'Cliente',
        description: `Notificaciones`,
    }
};

export default function NotificationsPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Notificaciones"/>
            <div className="px-2 md:px-8 w-full">
              <Notifications/>
            </div>
        </Box>
        <Options/>
    </div>
  );
}