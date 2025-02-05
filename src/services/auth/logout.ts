import { signOut } from "next-auth/react";

export const logout = async() => {
    await signOut();
    setTimeout(() => {
        window.location.reload();
    }, 1000);
};