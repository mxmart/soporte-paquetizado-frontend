import axios from "axios";
import { toast } from "sonner";

interface Props {
    username: string;
    password: string;
};

// body {
//     "username":"", "password":""
// }

export const userChangePassword = async({ username, password }: Props) => {

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/userChangePassword`;

    try {

        toast.loading('Cambiando contraseña...')
        const response = await axios.post( url, { username, password });
        toast.dismiss()
        toast.success( response.data.message )
        
    } catch (error: any) {

        toast.dismiss();
        toast.error('Error al cambiar la contraseña');
        throw new error('Error al cambiar la contraseña');
        
    }

};