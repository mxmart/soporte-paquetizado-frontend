import { cognitoSub } from "@/helpers";
import { INotifications } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    page_number?: string
    filter: "all" | "readed" | "unreaded";
};

export const getNotifications = async({ page_number = "1", filter = "all" }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getNotifications?cognito_sub=${ cognito_sub }&page_number=${ page_number }&filter=${ filter }`;

    try {
        
        const response = await axios.get( url );
        return response.data.resp.data[0] as INotifications || [];

    } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.resp?.message || 'Hubo un error al obtener las notificaciones');
    }

};