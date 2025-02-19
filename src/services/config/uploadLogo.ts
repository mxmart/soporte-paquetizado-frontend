import { cognitoSub } from "@/helpers";
import axios from "axios";
import { toast } from "sonner";

interface Props {
    file: string;
};

// body: {
//     file: file
// }

export const uploadLogo = async({ file }: Props) => {

    const cognito_sub = await cognitoSub();
    if( !cognito_sub ) return;

    const url = `${process.env.NEXT_PUBLIC_API_CONFIG_URL}/changeLogo?cognito_sub=${ cognito_sub }`;

    try {
        
        toast.loading("Subiendo logo...");
        const response = await axios.post( url, { file });
        toast.dismiss();
        toast.success("Logo subido correctamente.");

    } catch (error: any) {
        
        console.log(error);
        toast.dismiss();
        toast.error( error?.response?.data || 'Error al cargar el logo');

    }

};