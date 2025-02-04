import { Box, DashboardTitle, Options } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Registro de empresas`,
    openGraph: {
        title: 'Administración',
        description: `Registro de empresas`,
    }
};

export default function RegisterCompanyPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Registrar una empresa"/>
            <div className="px-2 md:px-8 w-full">
              
            </div>
        </Box>
        <Options
          options={['administrador']}
          type="admin"
        />
    </div>
  );
}