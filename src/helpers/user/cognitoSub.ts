'use server'
import { auth } from "@/auth"

export const cognitoSub = async() => {
    const session = await auth();
    const cognito_sub = session?.user.cognito_sub;
    return cognito_sub;
}

export const getUser = async() => {
    const session = await auth();
    const user = session?.user;
    return user;
}