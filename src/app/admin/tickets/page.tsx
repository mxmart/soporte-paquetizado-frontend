import { Box, DashboardTitle, Options } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Vista de tickets`,
    openGraph: {
        title: 'Administración',
        description: `Vista de tickets`,
    }
};

export default function TicketsPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Registro de tickets" />
            <div className="px-2 md:px-8 w-full">
              
            </div>
        </Box>
        <Options/>
    </div>
  );
}