import { getCookie } from '@/lib/cookie';
import { useQuery } from '@tanstack/react-query';

// TODO: Update these
export interface HFModelResponse {
    id: string;
    userId: string;
    displayName: string;
    hfModelId: string;
    hfUrl?: string;
    shortDescription?: string;
    fullDescription?: string;
    taskType?: string;
    medicalDomain?: string;
    modality?: string;
    accuracy?: number;
    f1Score?: number;
    aucScore?: number;
    precision?: number;
    recall?: number;
    trainedOnDataset?: string;
    datasetUrl?: string;
    architecture?: string;
    framework?: string;
    parametersMillions?: string;
    inferenceType?: string;
    supportsBatch: boolean;
    maxInputSize: number;
    modelVersion?: string;
    revision?: string;
    isActive: boolean;
    isExperimental: boolean;
    createdAt: string;
    updatedAt: string;
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
            const data = await res.json()
            return data.map((item: any) => ({
                id: item.id,
                userId: item.user_id,
                displayName: item.display_name,
                hfModelId: item.hf_model_id,
                hfUrl: item.hf_url,
                shortDescription: item.short_description,
                fullDescription: item.full_description,
                taskType: item.task_type,
                medicalDomain: item.medical_domain,
                modality: item.modality,
                accuracy: item.accuracy,
                f1Score: item.f1_score,
                aucScore: item.auc_score,
                precision: item.precision,
                recall: item.recall,
                trainedOnDataset: item.trained_on_dataset,
                datasetUrl: item.dataset_url,
                architecture: item.architecture,
                framework: item.framework,
                parametersMillions: item.parameters_millions,
                inferenceType: item.inference_type,
                supportsBatch: item.supports_batch,
                maxInputSize: item.max_input_size,
                modelVersion: item.model_version,
                revision: item.revision,
                isActive: item.is_active,
                isExperimental: item.is_experimental,
                createdAt: item.created_at,
                updatedAt: item.updated_at,
            })) as HFModelResponse[];
        }
    })
}
