import { Box, DashboardTitle, Options } from "@/components";
import { Metadata } from "next";
import { ConfigurationPages } from "./components";
import { checkUserPermissions } from "@/helpers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Configuración',
    description: `Configuración de la plataforma de soporte ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    openGraph: {
        title: 'Configuración',
        description: `Configuración de la plataforma de soporte ${ process.env.NEXT_PUBLIC_APP_NAME }`,
    }
};

export default async function PlatformConfigurationPage() {

    const canAccess = await checkUserPermissions(['platform-configuration']);
    if( !canAccess ) redirect('/admin');

  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <div className="flex w-full flex-col order-2 lg:order-1">
            <DashboardTitle title="Configuración de la plataforma" alternative/>
            <ConfigurationPages/>
        </div>
        <Options
            options={['administrador']}
            type="admin"
        />
    </div>
  );
}