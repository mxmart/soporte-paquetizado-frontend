import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Administración',
    description: `Perfil del usuario`,
    openGraph: {
        title: 'Administración',
        description: `Perfil del usuario`,
    }
};

export default function ProfilePage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Información de cuenta"/>
            <div className="px-2 md:px-8 w-full">
              <UserForm
                type="update"
                userType="admin"
              />
            </div>
        </Box>
        <Options/>
    </div>
  );
}