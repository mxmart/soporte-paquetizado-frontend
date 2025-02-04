export function cleanText(input: string): string {
    // Utilizar una expresión regular para eliminar la fecha y hora
    const sinFecha = input.replace(/\d{1,2}\/\d{1,2}\/\d{4}, \d{2}:\d{2}:\d{2}/, '');
    
    // Eliminar las comas sobrantes
    const resultado = sinFecha.replace(/,/g, '').trim();
    
    return resultado;
  }