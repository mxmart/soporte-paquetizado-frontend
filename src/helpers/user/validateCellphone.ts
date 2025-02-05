//^[\+]?(?:[0-9]{1,4})?[0-9]{3,4}[0-9]{4}$
// Función para corroborar que el numero de telefono sea válido
export const isValidCellphone = (email: string) => {

    const match = String(email)
        .toLowerCase()
        .match(
            /^\+\d{1,3}\d{9}$/
        );
    return !!match;
};

export const isCellphone = (email: string) => {
    return isValidCellphone(email.trim())
        ? true
        : false;
}