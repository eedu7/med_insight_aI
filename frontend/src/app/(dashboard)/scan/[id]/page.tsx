import { ScannedImagesPageView } from "@/features/scan/view/scanned-images-page-view"

interface Props {
    params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
    const { id } = await params
    return (
        <ScannedImagesPageView scanId={id} />
    )
}
