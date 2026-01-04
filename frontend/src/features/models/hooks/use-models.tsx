import { useQuery } from '@tanstack/react-query';

interface ModelProps {
    displayName: string;
    id: string;
    hfModelId: string;
    hfUrl: string;
    shortDescription: string;
    fullDescription: string;
    taskType: string;
    medicalDomain: string;
    modality: string;
    accuracy: number;
    f1Score: number;
    aucScore: number;
    precision: number;
    recall: number;
    trainedOnDataset: string;
    datasetUrl: string;
    architecture: string;
    framework: string;
    parametersMillions: number;
    inferenceType: string;
    supportsBatch: boolean;
    maxInputSize: number;
    modelVersion: string;
    isActive: boolean;
    isExperimental: boolean;
    createdAt: string;
    updatedAt: string;
}

export const useGetModels = () => {
    return useQuery({
        queryKey: ['models'],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL!}/hf-models`)
            if (!res.ok) {
                throw new Error('Failed to fetch models')
            }
            return res.json()
        }
    })
}
