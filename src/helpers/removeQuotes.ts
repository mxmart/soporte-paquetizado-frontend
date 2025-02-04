export const removeQuotes = ( text: string ) => {
    // Remueve todas las diagonales invertidas seguidas de comillas
    text = text.replace(/\\"/g, '');
    // Remueve todas las diagonales invertidas
    text = text.replace(/\\/g, '');
    // Remueve todas las comillas dobles del inicio y el final
    text = text.replace(/^"|"$/g, '');
    // Remueve todas las comillas dobles restantes
    text = text.replace(/"/g, '');
    return text;
};