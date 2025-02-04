import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { IUser } from "@/interfaces";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Creación de cuentas para administradores o agentes`,
    openGraph: {
        title: 'Administración',
        description: `Creación de cuentas para administradores o agentes`,
    }
};

export default function CreateAccountPage() {

  const user: IUser = {
    name: "",
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
    profile_pic: "",
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