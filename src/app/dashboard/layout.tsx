import { auth } from "@/auth";
import { Header, Margin, Sidebar } from "@/components";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const session = await auth();
    if( !session ) redirect('/auth/login');
  
    const name = session.user.account_holder || "Usuario";
    const image = session.user.profile_picture || "/images/User_image_default.png";

  return (
    <div className="w-full flex">
        <Sidebar/>
        <main className="w-full flex">
            <Margin/>
            <div className="w-full flex flex-col justify-center items-center pb-4 px-4">
              <Header 
                userType="customer"
                image={ image }
                name={ name }
              />
              { children }
            </div>
        </main>
    </div>
  );
}