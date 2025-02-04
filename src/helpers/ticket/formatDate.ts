import moment from 'moment-timezone';

export const formatDate = ( date: Date ) => {

    // const localTimeString = new Date().toLocaleTimeString();
    // const [hours, minutes, seconds] = localTimeString.split(':').map(part => parseInt(part));
    // const localDate = new Date();
    // localDate.setHours(hours, minutes, seconds);
    // const offset = getUtcOffset(localDate);
    // const cdmxDate = moment(date).subtract(offset, 'hours').format('YYYY-MM-DDTHH:mm');
    // const cdmxDateFormatted: Date = new Date(cdmxDate);

    const easternTimeZone = 'Atlantic/Azores';
    const mexicoCityTimeZone = 'America/Mexico_City'; 
    const dateFormat = moment.tz(date, easternTimeZone);
    dateFormat.tz(mexicoCityTimeZone);
    dateFormat.format('YYYY-MM-DD HH:mm:ss')

    const cdmxDate = moment( dateFormat ).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
    const cdmxDateFormatted: Date = new Date(cdmxDate);

    const meses: string[] = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
    const mes: string = meses[cdmxDateFormatted.getMonth()];

    const dia: string | number = cdmxDateFormatted.getDate();
    const año: number = cdmxDateFormatted.getFullYear();
    const hora: number = cdmxDateFormatted.getHours();
    const minutos: number = cdmxDateFormatted.getMinutes();
    const segundos: number = cdmxDateFormatted.getSeconds();

    const am_pm: string = hora >= 12 ? 'pm' : 'am';
    let horaFormateada: number | string = hora % 12;
    horaFormateada = horaFormateada ? horaFormateada : 12; // El 0 se considera como 12 en formato de 12 horas

    const diaFormateado: string = dia < 10 ? '0' + dia : dia.toString();
    const horaFormateadaStr: string = horaFormateada < 10 ? '0' + horaFormateada : horaFormateada.toString();
    const minutosFormateados: string = minutos < 10 ? '0' + minutos : minutos.toString();
    const segundosFormateados: string = segundos < 10 ? '0' + segundos : segundos.toString();

    const fechaFormateada: string = mes + ". " + diaFormateado + ", " + año + ", " + horaFormateadaStr + ":" + minutosFormateados + " " + am_pm;

    return fechaFormateada;

};