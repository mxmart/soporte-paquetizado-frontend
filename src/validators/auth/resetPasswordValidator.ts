import { toast } from "sonner";

interface Props {
    username: string;
};

export const resetPasswordValidator = async({ username }: Props) => {

    const isValid = new Promise( async( resolve, reject ) => {

        if( !username ){
            reject('Ingresa un email.');
        };

        resolve( true );

    });

    toast.promise(
        isValid,
        {
            loading: 'Validando el email...',
            success: 'Email validado.',
            error: (error) => error
        },
    );

    return isValid.then( () => { return true }).catch( () => { return false });

};