import axios from "axios";

interface Props {
    email: string;
    password: string;
};

// body = {
//     "email": "sergio.trujillo@mxmart.mx",
//     "password": "123456789Ss!"
// }

export const authentication = async({ email, password }: Props) => {

    const url = `${process.env.NEXT_PUBLIC_API_USERS_URL}/startAuthentication`;

    try {
        
        const response = await axios.post(url, { email, password }) as any;
        return response.data as any;

    } catch (error: any) {
        
        console.log( error.response.data.resp );
        throw new Error( error.response.data.resp.message || 'Internal server error' );

    }

};