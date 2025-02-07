import { Box, DashboardTitle, Options, UserForm } from "@/components";
import { checkUserPermissions } from "@/helpers";
import { IUser } from "@/interfaces";
import { getUserInformation } from "@/services";
import { redirect } from "next/navigation";

type Params = Promise<{ rcdId: string }>


export default async function UpdateAdminPage(props: { params: Params }) {

    const canAccess = await checkUserPermissions(['manage-admin-accounts']);
    if( !canAccess ) redirect('/admin');

    const params = await props.params;
    const user_id = params.rcdId;
    const user = await getUserInformation({ user_id: Number(user_id)});
    if( !user ) redirect('/admin/manage-accounts');

  return (
    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row justify-between mt-7 gap-x-8">
        <Box>
            <DashboardTitle title="Crear cuenta para admin o agente"/>
            <div className="px-2 md:px-8 w-full">
              <UserForm
                type="update"
                userType="admin"
                user={ user }
                isManagingAccount
              />
            </div> 
        </Box>
        <Options
          options={[]}
          type="admin"
        />
    </div>
  );
} 