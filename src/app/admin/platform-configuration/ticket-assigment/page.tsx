import { Box, DashboardTitle, HeaderTitle, Options, TabLink } from "@/components";
import { Metadata } from "next";
import { TicketAssigmentForm } from "./components/TicketAssigmentForm";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Cuentas de administrativos y agentes`,
    openGraph: {
        title: 'Administración',
        description: `Cuentas de administrativos y agentes`,
    }
};

export default function TicketAssigment() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <div className="w-full mb-3 lg:mb-0 order-2 lg:order-1">
        <HeaderTitle title={ "Configuración de la plataforma" } />
          <div className="w-full rounded-t-lg flex items-center text-sm h-10 justify-between">
            <div className="w-full bg-22 rounded-t-lg border-color border-b-2 ">
              <TabLink text="Apariencia general" url="/admin/platform-configuration" />
              <TabLink active text="Asignación automatica de tickets" url="/admin/platform-configuration/ticket-assigment" />
            </div>
          </div>
          <Box withTabs>
              <div className="px-2 md:px-8 w-full">
                  <TicketAssigmentForm/>
              </div>
          </Box>
        </div>
        <Options
          options={['administrador']}
          type="admin"
        />

      </div>
  );
}