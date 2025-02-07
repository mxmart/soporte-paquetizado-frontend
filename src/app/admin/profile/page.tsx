import { auth } from "@/auth";
import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Perfíl',
    description: `Perfil del usuario`,
    openGraph: {
        title: 'Perfíl',
        description: `Perfil del usuario`,
    }
};

export default async function ProfilePage() {

  const user = await auth();
  if( !user ) redirect('/admin');
  
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Información de cuenta"/>
            <div className="px-2 md:px-8 w-full">
              <UserForm
                type="update"
                userType="admin"
                user={ user.user }
              />
            </div>
        </Box>
        <Options
          options={['administrador']}
          type="admin"
        />
    </div>
  );
}