import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const SelectScanType = () => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select scan type" />
            </SelectTrigger>
            <SelectContent>
                {/* Body Part Scans */}
                <SelectItem value="Skin">Skin</SelectItem>
                <SelectItem value="Brain">Brain</SelectItem>
                <SelectItem value="Lung">Lung</SelectItem>
                <SelectItem value="Heart">Heart</SelectItem>
                <SelectItem value="Abdomen">Abdomen</SelectItem>
                <SelectItem value="Kidney">Kidney</SelectItem>
                <SelectItem value="Liver">Liver</SelectItem>

                {/* Scan Types */}
                <SelectItem value="X-ray">X-ray</SelectItem>
                <SelectItem value="CT Scan">CT Scan</SelectItem>
                <SelectItem value="MRI">MRI</SelectItem>
                <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                <SelectItem value="PET Scan">PET Scan</SelectItem>
                <SelectItem value="Dermatoscopy">Dermatoscopy</SelectItem>

                <SelectItem value="X-ray">X-ray</SelectItem>
                <SelectItem value="CT Scan">CT Scan</SelectItem>
                <SelectItem value="MRI">MRI</SelectItem>
                <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                <SelectItem value="PET Scan">PET Scan</SelectItem>
                <SelectItem value="Dermatoscopy">Dermatoscopy</SelectItem>
            </SelectContent>
        </Select>
    );
};
