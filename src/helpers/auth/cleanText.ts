export function cleanText(input: string): string {
  // Log para verificar la entrada
  console.log('Input recibido:', input);

  // Utilizar una expresión regular para eliminar la fecha y hora
  const sinFecha = input.replace(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}/, '');
  console.log({ sinFecha });

  // Eliminar las comas sobrantes
  const resultado = sinFecha.replace(/,/g, '').trim();
  console.log({ resultado });

  return resultado;
}
