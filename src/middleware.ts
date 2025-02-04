import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "./interfaces";

interface Page {
    [key: string]: { roleToAccess: string }
};

interface Redirect {
    [key: string]: string
};

const pages: Page = {
    '/admin':   { roleToAccess: "Administrativo" },
    '/auth':    { roleToAccess: "No autenticado" },
    '/dashboard': { roleToAccess: "Cliente" },
};

const redirectTo: Redirect = {
    "Administrativo": '/admin',
    "Cliente": '/dashboard',
};

export async function middleware(request: NextRequest) {

    let pathname = '/dashboard';
    if( request.nextUrl.pathname.startsWith('/admin'))          pathname = '/admin';
    if( request.nextUrl.pathname.startsWith('/auth'))           pathname = '/auth/login';  
    if( request.nextUrl.pathname.startsWith('/dashboard'))      pathname = '/dashboard';

    const salt = process.env.NEXT_PUBLIC_STAGE === 'dev' ? 'authjs.session-token' : '__Secure-authjs.session-token';
    const token = request.cookies.get( salt )?.value;
    
    if( token ) {

        const secret = 'xtIruXRXzfM8nyyq7uQ7ubym7Y4O7UBjs1kVEZvfywg=';
        const decoded = await decode({ token, secret, salt }) as any;
        const { dashboard } = decoded.data as IUser;
        const page = pages[ pathname ];

        if( request.nextUrl.pathname === '/' ){
            if( dashboard === 'Administrativo' ) return NextResponse.redirect(new URL('/admin', request.url));
            if( dashboard === 'Cliente' ) return NextResponse.redirect(new URL('/dashboard', request.url));
            return NextResponse.redirect(new URL('/auth/login', request.url));
        };

        if( page?.roleToAccess === dashboard ) {

            return NextResponse.next();

        } else {

            return NextResponse.redirect( new URL( redirectTo[ dashboard ] || '/soporte', request.url ) ); 

        };

    }  else {
        const cookies = request.cookies.getAll();
        cookies.map( cookie => request.cookies.delete( cookie.name ));
        if( request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect( new URL( '/auth/login', request.url ) );
        }
    };

};

export const config = {
    matcher: [
        '/',
        '/auth/:path*', 
        '/admin/:path*', 
        '/dashboard/:path*',
    ],
};