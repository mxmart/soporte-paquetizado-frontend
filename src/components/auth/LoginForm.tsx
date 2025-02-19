'use client';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useState } from 'react'
import { Form } from './Form';
import { authenticate } from '@/actions/login';
import { toast } from 'sonner';
import { cleanText } from '@/helpers';
import { setCookie } from 'cookies-next';

export const LoginForm = () => {

    const { push } = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [state, dispatch] = useActionState(authenticate, undefined);

    useEffect(() => {
      if( state === undefined ) return;

      if( cleanText( state ) === 'NEW_PASSWORD_REQUIRED' ){
        const userData = { username: email, password, type: 'confirmPassword' };
        setCookie( 'userData', JSON.stringify( userData ));
        push('/auth/update-password');
        return;
      };

      if( state === 'Success' ){
        window.location.reload();
        return;
      };

      // toast.error( cleanText( state ));
    }, [ state ]);
    
  return (
    <form action={ dispatch } className="w-full">
        <Form
          email={ email }
          setEmail={ setEmail }
          password={ password }
          setPassword={ setPassword }
        />
    </form>
  )
}
