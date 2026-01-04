import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { SelectImages } from "../components/select-images";
import { SelectScanType } from "../components/select-scan-type";

export const ScanPageView = () => {
    return (
        <div className="w-full min-h-screen max-w-4xl mx-auto">
            <div className="h-full w-full flex items-center justify-center">
                <Card className="w-lg shadow-none border-none">
                    <CardHeader className="text-center">
                        <CardTitle>Medical Scan Analysis</CardTitle>
                        <CardDescription>
                            Upload an image and select the body part to begin AI
                            diagnosis.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <SelectScanType />
                        <SelectImages />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
