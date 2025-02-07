import { cognitoSub } from "@/helpers";
import { IUser } from "@/interfaces";
import axios from "axios";

interface Props {
    user_id: number;
};

export const getUserInformation = async({ user_id }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;
    
    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/getUserInformation?cognito_sub=${ cognito_sub }&admin_id=${ user_id }`;

    try {
        
        const response = await axios.get( url );
        return response.data.resp.data as IUser;

    } catch (error) {
        
        console.log(error);

    }

};