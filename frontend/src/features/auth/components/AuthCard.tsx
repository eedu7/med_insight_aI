import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

interface Props {
    children: React.ReactNode;
    title: string;
    decsription: string;
    actionLabel: string;
    actionUrl: string;
}

export const AuthCard = ({ title, decsription, children, actionLabel, actionUrl }: Props) => {
    return (
        <Card className='w-full max-w-md shadow-none border-none'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{decsription}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Link href={actionUrl}>
                    {actionLabel}
                </Link>
            </CardFooter>
        </Card>
    )
}
