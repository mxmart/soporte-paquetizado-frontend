import { ConfirmSignInForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Confirmar inicio de sesión',
  description: `Confirmar inicio de sesión en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  openGraph: {
      title: 'Confirmar inicio de sesión',
      description: `Confirmar inicio de sesión en ${ process.env.NEXT_PUBLIC_APP_NAME }`,
  }
};

export default function ConfirmSignInPage() {
  return (
    <div className="bg-white w-full md:w-[500px] rounded-lg p-6 sm:px-12 shadow-lg">
      {/* TODO: Logo */}
        <h2 className="authTitle text-xl mt-6 mb-10 font-semibold">
            Confirmar inicio de sesión en la plataforma de eknownx
        </h2>
      <ConfirmSignInForm/>
    </div>
  );
}