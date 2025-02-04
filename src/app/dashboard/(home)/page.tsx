import { Box, BoxWidget, DashboardTitle, Options, Table } from "@/components";
import { Column } from "@/interfaces";
import { Metadata } from "next";
import { CustomerTickets } from "./components/CustomerTickets";

export const metadata: Metadata = {
    title: 'Cliente',
    description: `Home`,
    openGraph: {
        title: 'Cliente',
        description: `Home`,
    }
};




export default function CustomerPage() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Bienvenido Customer" userImage="/images/User_image_default.png"/>
            <div className="px-2 md:px-8 w-full">
              <BoxWidget type="customer"/>

              <CustomerTickets/>
            </div>
        </Box>
        <Options
          options={[]}
          type="customer"
        />
    </div>
  );
}