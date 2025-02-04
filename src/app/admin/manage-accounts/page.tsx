import { Box, DashboardTitle, Options } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Cuentas de administrativos y agentes`,
    openGraph: {
        title: 'Administración',
        description: `Cuentas de administrativos y agentes`,
    }
};

export default function ManageAccountsPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Cuentas de administrativos y agentes"/>
            <div className="px-2 md:px-8 w-full">
              
            </div>
        </Box>
        <Options/>
    </div>
  );
}