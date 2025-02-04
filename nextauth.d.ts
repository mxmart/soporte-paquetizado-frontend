import { IUser } from "@/interfaces";
import NextAuth, { DefaultSession } from "next-auth"; 

declare module 'next-auth' {
    interface Session {
        user: IUser & DefaultSession['user'];
    }
}