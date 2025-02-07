import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { checkUserPermissions } from "@/helpers";
import { IUser } from "@/interfaces";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Crear nueva cuenta',
    description: `Creación de cuentas para administradores o agentes`,
    openGraph: {
        title: 'Crear nueva cuenta',
        description: `Creación de cuentas para administradores o agentes`,
    }
};

export default async function CreateAccountPage() {

  const canAccess = await checkUserPermissions(['create-admin-agent']);
  if( !canAccess ) redirect('/admin');

  const user: IUser = {
    account_holder: "",
    cellphone: "",
    creation_date: new Date(),
    cognito_sub: "",
    company_id: 0,
    company_name: "",
    dashboard: "Administrativo",
    email: "",
    id: 0, 
    position_id: 0,
    permissions: [],
    profile_picture: "",
    role_id: 0,
  };

  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Crear cuenta para admin o agente"/>
            <div className="px-2 md:px-8 w-full">
              <UserForm
                type="new"
                userType="admin"
                user={ user }
              />
            </div> 
        </Box>
        <Options
          options={[]}
          type="admin"
        />
    </div>
  );
} 