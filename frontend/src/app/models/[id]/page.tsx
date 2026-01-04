import { ModelPageView } from '@/features/models/views/model-page-view';

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params;
    return (
        <ModelPageView modelId={id} />
    )
}
