import { Box, BoxWidget, DashboardTitle, Options } from "@/components";
import { Metadata } from "next";
import { AdminTickets } from "./components";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Administración de ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    openGraph: {
        title: 'Administración',
        description: `Administración de ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    }
};

export default function AdminPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Bienvenido Administrador" userImage="/images/User_image_default.png"/>
            <div className="px-2 md:px-8 w-full">
              <BoxWidget type="admin"/>
              <AdminTickets/>
            </div>
        </Box>
        <Options/>
    </div>
  );
}