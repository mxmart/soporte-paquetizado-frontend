import { cognitoSub } from "@/helpers";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    notification_id: number;
};

export const readNotification = async({ notification_id }: Props) => {

        const cognito_sub = await cognitoSub();
        if( !cognito_sub ) return;
    
        const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/readNotification?cognito_sub=${ cognito_sub }`;

        try {
            
            const response = axios.post( url, { notification_id });
            console.log(response)

        } catch (error: any) {

            console.log(error);
            toast.error(error.response.data.resp.message || 'Hubo un error al leer la notificacion');
            
        }

};