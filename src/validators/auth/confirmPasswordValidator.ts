import { toast } from "sonner";

interface Props {
    newPassword: string;
    confirmNewPassword: string;
};

export const confirmPasswordValidator = async({ newPassword, confirmNewPassword }: Props) => {

    const isValidPassword = new Promise( async( resolve, reject ) => {

        if( newPassword !== confirmNewPassword ) {
            reject('Las contraseñas no coinciden.');
        };

        if (newPassword.length < 8) {
            reject('La contraseña debe tener al menos 8 caracteres.');
        };

        const hasNumber = /\d/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
        const hasUpperCase = /[A-Z]/.test(newPassword);
        const hasLowerCase = /[a-z]/.test(newPassword);

        if (!hasNumber) {
            reject('La contraseña debe contener al menos un número.');
        };
        
        if (!hasSpecialChar) {
            reject('La contraseña debe contener al menos un carácter especial.');
        };

        if (!hasUpperCase) {
            reject('La contraseña debe contener al menos una letra mayúscula.');
        };

        if (!hasLowerCase) {
            reject('La contraseña debe contener al menos una letra minúscula.');
        };

        resolve( true );

    });

    toast.promise(
        isValidPassword,
        {
            loading: 'Validando la contraseña...',
            success: 'Las contraseñas coinciden.',
            error: (error) => error
        },
    );

    return isValidPassword.then( () => { return true }).catch( () => { return false });

}; 