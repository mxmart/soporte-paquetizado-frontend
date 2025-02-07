import { Logo, UpdatePasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Actualizar contraseña',
  description: `Actualizar contraseña en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  openGraph: {
      title: 'Actualizar contraseña',
      description: `Actualizar contraseña en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  }
};

export default function UpdatePasswordPage() {
  return (
    <div className="bg-white w-full md:w-[500px] rounded-lg p-6 sm:px-12 shadow-lg">
      <div className="w-52 h-24 flex items-center justify-center mx-auto">
        <Logo/>
      </div>
      <h2 className="authTitle text-xl mt-6 mb-4 font-semibold">
        Actualice contraseña
      </h2>
      <span className="text-xs md:text-sm mb-10">
        Escriba una nueva contraseña para ingresar a su interfaz
        y confírmarla en el segundo espacio.
      </span>
      <UpdatePasswordForm/>
    </div>
  );
}