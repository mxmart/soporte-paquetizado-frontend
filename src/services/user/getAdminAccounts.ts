import { cognitoSub } from "@/helpers";
import axios from "axios";
import { toast } from "sonner";

export const getAdminAccounts = async() => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;
    
    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getAdminAccounts?cognito_sub=${ cognito_sub }`;

    try {
        
        const response = await axios.get( url );
        return response.data.resp.data;

    } catch (error: any) {
        
        console.log(error);
        toast.error('Hubo un error al obtener las cuentas')

    }

};