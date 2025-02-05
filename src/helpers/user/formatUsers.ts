import { IUser } from "@/interfaces";

export const formatUsers = ( user: IUser ) => {

    const { account_holder, email, cellphone } = user;

    const formattedUser: IUser = {
        ...user,
        account_holder: account_holder.trim(),
        cellphone: cellphone.trim().replace(/ /g, ""),
        email: email.trim(),
    };

    return formattedUser;
};