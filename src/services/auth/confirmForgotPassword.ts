import axios from "axios";
import { toast } from "sonner";

interface Props {
    username: string;
    confirmationCode: string;
    newPassword: string;
};

// body {
//     "username": "sergio.trujillo@mxmart.mx",
//     "confirmation_code": "654319",
//     "new_password": "Sergio25!!"
// }

export const confirmForgotPassword = async({ username, confirmationCode, newPassword }: Props) => {

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/confirmForgotPassword`;

    try {

        toast.loading('Cambiando contraseña...');
        const response = await axios.post(url, { username, confirmation_code: confirmationCode, new_password: newPassword }) as any;
        toast.dismiss();
        toast.success(response.data.resp.message);
        
    } catch (error: any) {

        toast.dismiss();
        toast.error(error.response.data.resp.message);
        throw new error(error.response.data.resp.message)
        
    }

};