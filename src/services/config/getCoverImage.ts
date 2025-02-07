import { cognitoSub } from "@/helpers";
import { IRol } from "@/interfaces";
import axios from "axios";
import { toast } from "sonner";

export const getCoverImage = async() => {

    const url = `${process.env.NEXT_PUBLIC_API_CONFIG_URL}/getCoverImage`;

    try {

        const response = await axios.get( url );
        return response.data.resp.data[0].cover_image
        
    } catch (error) {
        
        console.log(error);
        toast.error("Error al obtener la imagen de portada.");

    };

};