import NextAuth, { AuthError, type Session, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { authErrors, removeQuotes } from "./helpers";
import { authentication } from "./services";
 
export const { handlers, signIn, signOut, auth, unstable_update: update } = NextAuth({
    providers: [
        Credentials({
            credentials: {
              email: {},
              password: {},
            },
            authorize: async (credentials) => {
              try {
                const { email, password } = credentials;

                const response = await authentication({ email: email as string, password: password as string });
                
                if( response.resp.type === 'AUTH_CHALLENGE' ) {
                  throw new Error( response.resp.message );
                };

                return response.resp;
              
              } catch (error: any) {
                const { message } = error;
                const errorMessage = authErrors[removeQuotes( message ) as keyof typeof authErrors] || message;
                class CustomAuthorizeError extends AuthError { code = `${ errorMessage }, ${ new Date().toLocaleString() }`}
                throw new CustomAuthorizeError()
              }
            },
          }),
    ],
    callbacks: {
      async jwt({ token, user, trigger, session }) {
        if ( user ){
          token.data = user;
        };

        if( trigger == "update" && session ) {
          token.data = session
        }
        
        return token;
      },

      async session({ session, token, trigger, newSession }){
        session.user = token.data as any;
        return session;
      },
    },
    secret: 'xtIruXRXzfM8nyyq7uQ7ubym7Y4O7UBjs1kVEZvfywg=',
    trustHost: true
  })