import { cognitoSub } from "@/helpers";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    connection_id: string;
};

export const saveNotificationsConnections = async({ connection_id }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/saveWebSocketConnections`;

    try {
        
        const response = await axios.post( url, { cognito_sub, connection_id });

    } catch (error) {
        
        console.log(error)
        toast.error("Hubo un error al conectarse al socket de notificaciones");

    };

};