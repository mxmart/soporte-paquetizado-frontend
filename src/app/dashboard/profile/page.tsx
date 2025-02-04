import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Cliente',
    description: `Perfil del cliente`,
    openGraph: {
        title: 'Cliente',
        description: `Perfil del cliente`,
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
                userType="customer"
              />
            </div>
        </Box>
        <Options/>
    </div>
  );
}