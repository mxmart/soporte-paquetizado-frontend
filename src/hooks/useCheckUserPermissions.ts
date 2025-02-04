import { checkUserPermissions } from "@/helpers";
import { useEffect, useState } from "react";

export const useCheckUserPermissions = ( permissions: string[] ) => {

    const [canSee, setCanSee] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkPermissions = async () => {
        setIsLoading(true);
        const hasPermission = await checkUserPermissions(permissions);
        setCanSee(hasPermission);
        setIsLoading(false);
      };

    useEffect(() => {
        checkPermissions();
    }, []);
    
    return {
        canSee, isLoading
    };

};