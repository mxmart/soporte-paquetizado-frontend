import { Box, DashboardTitle, Options, TicketForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tickets',
    description: `Creación de Tickets`,
    openGraph: {
        title: 'Tickets',
        description: `Creación de Tickets`,
    }
};

export default function CreateTicketPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Crear un nuevo ticket"/>
            <div className="px-2 md:px-8 w-full">
              <TicketForm userType={"admin"}/>
            </div>
        </Box>
        <Options/>
    </div>
  );
}