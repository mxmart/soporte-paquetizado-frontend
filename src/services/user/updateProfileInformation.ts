import { cognitoSub, formatUsers } from "@/helpers";
import { IUser } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    user: IUser;
};

// {
//     "customers": [
//         {
//             "id": "2",
//             "account_holder": "Sergio Garcia",
//             "email": "sergio.trujillo@mxmart.mx",
//             "cellphone": "+5232710233972",
//             "profile_picture": "base64",
//             "position_id": "14",
//             "cognito_sub": "4488f458-c0d1-7058-b60d-c2099624698a"
//         }
//     ]
// }

export const updateProfileInformation = async({ user }: Props) => {
    
    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;
    
    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/updateUser?cognito_sub=${ cognito_sub }`;
    const { account_holder, email, cellphone, profile_picture, position_id, role_id, company_id, id } = formatUsers( user );

    try {
        
        const customers = [{ id, account_holder, email, cellphone, profile_picture, position_id, cognito_sub }];
        toast.loading('Actualizando información...');
        const response = await axios.put( url, { customers, company_id });
        toast.dismiss();
        toast.success('Información actualizada correctamente');
        return response?.data?.resp?.data || null;
        
    } catch (error: any) {
        
        console.log(error);
        toast.dismiss();
        toast.error(error.response.data.resp.message || 'Hubo un error al actualizar la información');

    };

};