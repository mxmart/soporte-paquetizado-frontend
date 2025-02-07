import { cognitoSub } from "@/helpers";
import { ICellphone } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

export const getCellphones = async() => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getCellphones`;

    try {

        const response = await axios.get( url, {
            params: { cognito_sub },
        });

        return response.data.resp.data as ICellphone[];
        
    } catch (error) {
        
        console.log(error);
        toast.error("Error al obtener los números telefónicos.");

    };

};