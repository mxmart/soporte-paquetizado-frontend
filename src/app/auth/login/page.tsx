import { LoginForm, Logo } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: `Iniciar sesión en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  openGraph: {
      title: 'Iniciar sesión',
      description: `Iniciar sesión en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  }
};

export default function LoginPage() {

  return (
    <div className="bg-white w-full md:w-[500px] rounded-lg p-6 sm:px-12 shadow-lg">
      <div className="w-52 h-24 flex items-center justify-center mx-auto">
        <Logo/>
      </div>
      <h2 className="authTitle text-xl mt-6 mb-10 font-medium text-center">
        Inicie sesión en la plataforma de { process.env.NEXT_PUBLIC_APP_NAME }
      </h2>
      <LoginForm/>
    </div>
  );
} 