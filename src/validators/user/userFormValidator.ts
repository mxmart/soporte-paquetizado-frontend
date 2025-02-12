import { formatUsers, isCellphone } from "@/helpers";
import { IUser } from "@/interfaces";
import { getCellphones, getEmails, getPositions, getRoles } from "@/services";
import { toast } from "sonner";

interface Props {
    user: IUser;
    currentUser: IUser;
}; 

export const userFormValidator = async({ user, currentUser }: Props) => {

    const { account_holder, position_id, profile_picture, email, cellphone } = formatUsers( user );
    const { cellphone: currentCellphone, email: currentEmail } = formatUsers( currentUser );

    const isValid = new Promise( async(resolve, reject) => { 

        if (!account_holder) {
            reject("El campo Titular de la cuenta es obligatorio.");
        };

        if( account_holder.length <= 5 ) {
            reject("El campo Titular de la cuenta debe tener al menos 5 caracteres.");
        };

        if( account_holder.length > 50 ) {
            reject("El campo Titular de la cuenta debe tener máximo 50 caracteres.");
        };

        if (!profile_picture) {
            reject("El campo Imagen de perfil es obligatorio.");
        };

        if (!email) {
            reject("El campo Correo electrónico es obligatorio.");
        };

        if( email.length > 254 ) {
            reject("El campo Correo electrónico debe tener máximo 254 caracteres.");
        };

        if (!cellphone) {
            reject("El campo Número telefónico es obligatorio.");
        };

        if ( cellphone && cellphone !== currentCellphone && !isCellphone(cellphone)) {
            reject("Ingrese un Número de teléfono válido.");
        };

        const emails = await getEmails();
        if (currentEmail !== email) {
            const existsEmail = emails?.find((e) => e.email === email);
            if (existsEmail) {
                reject("El correo electrónico ya está registrado.");
            };
        };

        const roles = await getRoles({});
        const role = roles?.find((rol) => rol.id === user.role_id);
        if (!role) {
            reject(`El campo rol es obligatorio.`);
        };

        const cellphones = await getCellphones();
        if (currentCellphone !== cellphone) {
            const existsCellphone = cellphones?.find((c) => c.cellphone == cellphone);
            if (existsCellphone) {
                reject("El número telefónico ya está registrado.");
            };
        };

        const positions = await getPositions();
        const position = positions?.find((pos) => pos.id === position_id);
        if (!position) {
            reject(`El campo Puesto en la empresa es obligatorio.`);
        };

        resolve( true );

    });

    toast.promise(
        isValid,
        {
          loading: 'Válidando datos...',
          success: 'Se validarón los datos correctamente.',
          error: (err) => `${err.toString()}`,
        }
      );
    return isValid.then( () => { return true }).catch( () => { return false });

};