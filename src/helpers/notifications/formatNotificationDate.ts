import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import moment from 'moment-timezone';

export const calculateTimeSince = (fecha: Date): string => {

  const localTimeString = new Date().toLocaleTimeString();
  const [hours, minutes, seconds] = localTimeString.split(':').map(part => parseInt(part));
  const localDate = new Date();
  localDate.setHours(hours, minutes, seconds);
  
  const offset = getUtcOffset(localDate);

  const date = moment(fecha).subtract(offset, 'hours').format('YYYY-MM-DDTHH:mm');
  const fromNow = formatDistanceToNow( date, { locale: es } );

  return `Hace ${fromNow}`;

  };

  export const getUtcOffset = (date: Date): number => {
    const offsetMinutes = date.getTimezoneOffset();
    const offsetHours = Math.abs(offsetMinutes / 60);
    return offsetHours;
}
  