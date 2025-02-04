'use server';
import { auth } from '@/auth';

export const checkUserPermissions = async( necessaryPermissions: string[] ) => {

    const user = await auth();
    if( !user ) return false;
    
    const userPermissions = user.user.permissions || [];

    const filteredPermissions = necessaryPermissions.filter(permission => permission !== '');
    const canSee = filteredPermissions.every(permission => userPermissions?.includes(permission));
    return canSee;

};