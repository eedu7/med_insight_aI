import { requireUnAuth } from '@/lib/auth';
import React from 'react';

export const AuthLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    await requireUnAuth();
    return (
        <div className='h-screen w-full grid place-items-center'>{children}</div>
    )
}
