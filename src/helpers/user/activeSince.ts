import { format } from "@formkit/tempo"

const l = "es"

export const activeSince = ( date: Date ) => {
    return format(date, "DD/MM/YYYY", l);
};