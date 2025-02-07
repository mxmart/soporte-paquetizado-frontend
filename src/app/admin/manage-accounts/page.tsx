import { Box, DashboardTitle, Options } from "@/components";
import { checkUserPermissions } from "@/helpers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ManageAccounts } from "./components";

export const metadata: Metadata = {
    title: 'Administración de cuentas',
    description: `Cuentas de administrativos y agentes`,
    openGraph: {
        title: 'Administración de cuentas',
        description: `Cuentas de administrativos y agentes`,
    }
};

export default async function ManageAccountsPage() {

  const canAccess = await checkUserPermissions(['manage-admin-accounts']);
  if( !canAccess ) redirect('/admin');

  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Cuentas de administrativos y agentes"/>
            <div className="px-2 md:px-8 w-full">
              <ManageAccounts/>
            </div>
        </Box>
        <Options
          options={['administrador']}
          type="admin"
        />
    </div>
  );
}