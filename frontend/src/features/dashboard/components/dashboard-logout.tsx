"use client";
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { useLogout } from '@/features/auth/hooks/use-auth';
import { LogOutIcon } from 'lucide-react';

export const DashboardLogout = () => {
    const { mutate, isPending } = useLogout()
    return (
        <SidebarMenuButton
            disabled={isPending}
            onClick={() => mutate(undefined)}
        >
            {
                isPending ? (
                    <>
                        <Spinner className='mr-2' />
                        Logging out...
                    </>
                ) : (
                    <><LogOutIcon />
                        LogOut
                    </>
                )
            }

        </SidebarMenuButton >
    )
}
