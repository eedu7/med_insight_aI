"use client";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useCheckout } from "@/features/payment/hooks/use-payment";
import { SparklesIcon } from "lucide-react";


export const DashboardUpgradeToPro = () => {
    const { isPending, mutate } = useCheckout()
    return (
        <SidebarMenuButton
            disabled={isPending}
            onClick={() => mutate(undefined)}
        >
            {
                isPending ? (
                    <>
                        <Spinner className="mr-2" />
                        Checking out
                    </>
                ) : (
                    <>
                        <SparklesIcon />
                        Upgrade to Pro
                    </>
                )
            }

        </SidebarMenuButton>
    )
}
