import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { RiFacebookFill, RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";

const services = [
    { id: 1, text: 'Trate de inmediato incidentes de continuidad' },
    { id: 2, text: 'Resuelva problemas de operación' },
    { id: 3, text: 'Resuelva problemas de ciberseguridad' },
    { id: 4, text: 'Resuelva asesoría sobre su proyecto' },
 ];

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    const year = new Date().getFullYear();

  return (
    <div className="auth w-full h-auto md:h-[100vh] flex flex-col">
    {/* TODO: Reemplazar imagen bg por imagen dinamica */}
    <div className="w-full h-[300px] lg:h-[350px] bg-cover bg-center" style={{ backgroundImage: `url(/images/Banner_Login_V2.png)` }}>
      <div className="flex items-center justify-end p-10 text-2xl text-white gap-x-2">
        {/* TODO: Reemplazar por redes sociales de la empresa */}
        <Link href={'https://www.facebook.com/MxmartSolutions'} target="_blank">
            <RiFacebookFill className="cursor-pointer icon"/>
        </Link>
        <Link href={'https://www.linkedin.com/company/mxmartempresarial/mycompany/'} target="_blank">
            <RiLinkedinFill className="cursor-pointer icon"/>
        </Link>
        <Link href={'https://www.youtube.com/@MxmartMx1'} target="_blank">
            <RiYoutubeFill className="cursor-pointer icon"/>
        </Link>
      </div>
    </div>
    <div className="h-auto w-full div-center flex flex-col md:flex-row justify-center gap-x-20 p-4">

      { children }

        <div className="w-full md:w-[500px] flex justify-end flex-col mt-10 mb-10 md:mb-0 px-4">
            <h1 className="mr-auto mt-auto text-4xl font-bold">Bienvenido</h1>
            <h2 className="mr-auto text-lg font-bold">A la plataforma de soporte de { process.env.NEXT_PUBLIC_APP_NAME }:</h2> 
            <ul className="mt-10">
            {
                services.map( service => (
                <li key={ service.id } className="mb-2 flex items-center">
                    <Image
                        src={'/images/Icon_checkbox.svg'}
                        width={ 20 }
                        height={ 20 }
                        alt={`${ process.env.NEXT_PUBLIC_APP_NAME } Checkbox`}
                        className="mr-2"
                    />
                    { service.text }
                </li>
                ))
            }
            </ul>
        </div>
    </div>
  </div>
  );
}