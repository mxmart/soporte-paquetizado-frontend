import { cognitoSub } from "@/helpers";
import { IRol } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

export const getLogo = async() => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getLogo?cognito_sub=${ cognito_sub }`;

    try {

        const response = await axios.get( url );
        return response.data.resp.data[0].logo;
        
    } catch (error) {
        
        console.log(error);
        toast.error("Error al obtener el logo.");

    };

};