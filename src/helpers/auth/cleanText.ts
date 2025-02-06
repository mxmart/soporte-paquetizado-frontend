export function cleanText(input: string): string {

    const isProduction = process.env.NEXT_PUBLIC_STAGE === 'dev' ? false : true;

    if( isProduction ){

      const sinFecha = input.replace(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/, '');
      const resultado = sinFecha.replace(/,/g, '').trim();
      return resultado;

    } else {

      const sinFecha = input.replace(/\d{1,2}\/\d{1,2}\/\d{4}, \d{2}:\d{2}:\d{2}/, '');
      const resultado = sinFecha.replace(/,/g, '').trim();
      return resultado;

    }

}
