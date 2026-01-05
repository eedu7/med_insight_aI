import { getCookie } from '@/lib/cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Scan {
    id: string;
    title: string;
}

export const useCreateScan = () => {
    const accessToken = getCookie("accessToken");
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationKey: ['create-scan'],
        mutationFn: async (data: FormData) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/scan/`, {
                method: 'POST',
                body: data,
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!res.ok) {
                toast.error("Error in creating scan")
                throw new Error("Error in creating a scan")
            }

            return res.json() as Promise<Scan>;
        },
        onSuccess: (data) => {
            toast.success("Created the scan")
            queryClient.invalidateQueries({
                queryKey: ["chats", "use-get-chats"]
            })
            router.push(`/scan/${data.id}`);
        }
    });
};

export const useGetScans = () => {
    const accessToken = getCookie("accessToken");
    return useQuery({
        queryKey: ['scan', "use-get-scans"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/scan/`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!res.ok) {
                toast.error("Error in creating scan")
                throw new Error("Error in creating a scan")
            }

            return res.json() as Promise<Scan[]>;
        }
    })
}

interface ScannedImage {
    id: string;
    status: string;
    file_name: string;
    results?: string;
}

interface ScanWithScannedImages {
    id: string;
    title: string;
    number_of_images: number;
    scanned_images: ScannedImage[];
}


export const useGetScanByID = (id: string) => {
    const accessToken = getCookie("accessToken");

    return useQuery({
        queryKey: ["scan", "get-scan-by-id", id],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/scan/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!res.ok) {
                toast.error("Error in creating scan")
                throw new Error("Error in creating a scan")
            }

            return res.json() as Promise<ScanWithScannedImages>;
        },
        enabled: !!id
    })
}