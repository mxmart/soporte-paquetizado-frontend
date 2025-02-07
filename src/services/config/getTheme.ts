import axios from "axios";
import { toast } from "sonner";

export const getTheme = async() => {

    const url = `${process.env.NEXT_PUBLIC_API_CONFIG_URL}/getTheme`;

    try {

        const response = await axios.get( url );
        return response.data.resp.data[0].label;
        
    } catch (error) {
        
        console.log(error);

    };
};