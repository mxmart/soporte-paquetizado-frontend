import { cognitoSub } from "@/helpers";
import { IRol } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    type?: 'admin' | 'customer'
};

export const getRoles = async({ type }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getRoles`;

    try {

        const response = await axios.get( url, {
            params: { cognito_sub, type },
        });

        return response.data.resp.data as IRol[];
        
    } catch (error) {
        
        console.log(error);
        toast.error("Error al obtener los roles.");

    };

};