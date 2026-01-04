"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectScanTypeProps {
    value: string;
    onValueChange: (value: string) => void;
}

export const SelectScanType = ({ value, onValueChange }: SelectScanTypeProps) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Scan Category
            </label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select scan type or body part" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Skin">Skin</SelectItem>
                    <SelectItem value="Brain">Brain</SelectItem>
                    <SelectItem value="Lung">Lung</SelectItem>
                    <SelectItem value="Heart">Heart</SelectItem>
                    <SelectItem value="Abdomen">Abdomen</SelectItem>
                    <SelectItem value="Kidney">Kidney</SelectItem>
                    <SelectItem value="Liver">Liver</SelectItem>

                    <SelectItem value="X-ray" className="border-t mt-1 pt-2">X-ray</SelectItem>
                    <SelectItem value="CT Scan">CT Scan</SelectItem>
                    <SelectItem value="MRI">MRI</SelectItem>
                    <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                    <SelectItem value="PET Scan">PET Scan</SelectItem>
                    <SelectItem value="Dermatoscopy">Dermatoscopy</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};