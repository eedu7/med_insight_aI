import { getCookie } from '@/lib/cookie';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateScan = () => {
    const accessToken = getCookie("accessToken");

    const router = useRouter();
    return useMutation({
        mutationKey: ['create-scan'],
        mutationFn: async (data: FormData) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/scan/`, {
                method: 'POST',
                body: data,
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Failed to create scan');
            }

            return response.json();
        },
        onSuccess: (data) => {
            router.push(`/scan/${data.id}`);
        }
    });
};
