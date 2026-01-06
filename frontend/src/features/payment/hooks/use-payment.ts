

import { getCookie } from '@/lib/cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CheckoutRespones {
    url: string;
}
// TODO: Add toast

export const useCheckout = () => {
    const router = useRouter();
    const accessToken = getCookie('accessToken');
    return useMutation({
        mutationKey: ['use-payment', 'use-checkout'],
        mutationFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/checkout/pro`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )

            return res.json() as Promise<CheckoutRespones>;
        },
        onSuccess: (data) => {
            router.push(data.url);
        }
    })
}



export const useCheckoutSuccess = () => {
    const router = useRouter();
    const accessToken = getCookie('accessToken');
    return useMutation({
        mutationKey: ['use-payment', 'use-checkout'],
        mutationFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/success`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
            )
        },
        onSuccess: () => {
            router.push("/chat");
        }
    })
}

