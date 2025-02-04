'use server';
import { signIn } from "@/auth";

export async function authenticate( prevState: string | undefined, formData: FormData ) {
  try {
    const res = await signIn('credentials', {
        ...Object.fromEntries(formData), 
        redirect: false
    });

    return 'Success';
    
  } catch (error: any) {
    return error.code
  }
}
