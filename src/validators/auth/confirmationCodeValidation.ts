import { toast } from "sonner";

interface Props {
    confirmationCode: string;
};

export const confirmationCodeValidation = async({ confirmationCode }: Props) => {

    const isValid = new Promise( async( resolve, reject ) => {

        if( !confirmationCode ){
            reject('Ingresa un código de confirmación.');
        };

        resolve( true );

    });

    toast.promise(
        isValid,
        {
            loading: 'Validando el código de confirmación...',
            success: 'Código de confirmación válido.',
            error: (error) => error
        },
    );

    return isValid.then( () => { return true }).catch( () => { return false });

};