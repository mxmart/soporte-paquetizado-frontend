import { cognitoSub, formatUsers } from "@/helpers";
import { IUser } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    user: IUser;
};

// body: {
//     "account_holder": "Carl1os Diaz",
//     "email": "sergiotruga@gmail.com",
//     "cellphone": "312111111111",
//     "profile_picture":"base64",
//     "position_id":"10",
//     "role_id": "3",
//     "company_id":"1"
// }

export const createAccount = async({ user }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;
    
    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/createAdminOrAgent?cognito_sub=${ cognito_sub }`;
    const { account_holder, email, cellphone, profile_picture, position_id, role_id, company_id } = formatUsers( user );
    
    try {

        toast.loading('Creando usuario...');
        const response = await axios.post(url, { account_holder, email, cellphone, profile_picture, position_id, role_id, company_id });
        toast.dismiss();
        toast.success('Usuario creado correctamente');
    
    } catch (error: any) {
        
        console.log(error);
        toast.dismiss();
        toast.error(error.response.data.resp.message || 'Hubo un error al crear el usuario');

    }

};