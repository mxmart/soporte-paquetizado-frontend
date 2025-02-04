import { Box, DashboardTitle, Options, TicketForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cliente',
    description: `Creación de ticket`,
    openGraph: {
        title: 'Cliente',
        description: `Creación de ticket`,
    }
};

export default function CreateTicketPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Crear un nuevo ticket"/>
            <div className="px-2 md:px-8 w-full">
              <TicketForm userType={"customer"}/>
            </div>
        </Box>
        <Options/>
    </div>
  );
}