import { getCookie } from '@/lib/cookie';
import { useQuery } from '@tanstack/react-query';

// TODO: Update these
export interface HFModelResponse {
    display_name: string;
    model_id: string;
    model_provider: string;
    model_url?: string;
    description?: string;
    task_type?: string;
    medical_domain?: string;
    accuracy?: string | number;
    trained_on_dataset?: string;
    dataset_url?: string;
    inference_type?: string;
    is_active: boolean;
    is_experimental: boolean;
    id: string;
}

export const useGetModels = () => {
    const accessToken = getCookie("accessToken");

    return useQuery({
        queryKey: ['models'],
        queryFn: async () => {
            const res = await fetch('http://localhost:8000/api/v1/hf-model/?skip=0&limit=10',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${accessToken}`
                    },
                }

            )
            if (!res.ok) {
                throw new Error('Failed to fetch models')
            }
            return res.json() as Promise<HFModelResponse[]>;
        }
    })
}
