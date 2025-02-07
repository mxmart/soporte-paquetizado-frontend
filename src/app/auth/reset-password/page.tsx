import { Logo, ResetPasswordForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  description: `Recuperar contraseña en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  openGraph: {
      title: 'Recuperar contraseña',
      description: `Recuperar contraseña en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  }
};

export default function ResetPasswordPage() {
  return (
    <div className="bg-white w-full md:w-[500px] rounded-lg p-6 sm:px-12 shadow-lg">
      <div className="w-full flex items-center justify-center">
        <Logo/>
      </div>
      <h2 className="authTitle text-xl mt-6 mb-4 font-semibold">
        Restaurar la contraseña
      </h2>
      <span className="text-sm mb-10">
        Escriba el correo electrónico o nombre de usuario correspondiente 
        a su cuenta y después presione el botón de continuar, enviaremos un código de recuperación
      </span>
      <ResetPasswordForm/>
    </div>
  );
}