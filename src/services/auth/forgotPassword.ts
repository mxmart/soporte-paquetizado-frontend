import axios from "axios";
import { toast } from "sonner";

interface Props {
    username: string;
};

// body {
//     "username":"sergio.trujillo@mxmart.mx"
// }

export const forgotPassword = async({ username }: Props) => {

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/forgotPassword`;

    try {

        toast.loading('Enviando correo de recuperación...');
        const response = await axios.post(url, { username }) as any;
        toast.dismiss();
        toast.success(response.data.resp.message);
        
    } catch (error: any) {

        toast.dismiss();
        toast.error(error.response.data.resp.message);
        throw new error(error.response.data.resp.message)
        
    }

};