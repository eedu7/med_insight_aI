"use client";

import { Spinner } from "@/components/ui/spinner";
import { useCheckoutSuccess } from "@/features/payment/hooks/use-payment";
import { useEffect } from "react";

export default function Page() {
    const { isPending, mutate } = useCheckoutSuccess()
    useEffect(() => {
        mutate(undefined)
    })
    return (
        <div className="h-screen w-full grid place-items-center">
            <Spinner className="size-12" />
        </div>
    )
}
