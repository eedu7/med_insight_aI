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
        <div className="w-full">
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full h-16 rounded-4xl border-border bg-muted/30 focus:ring-emerald-500/20 px-6 font-semibold transition-all hover:bg-muted/50">
                    <SelectValue placeholder="Identify Scan Category or Organ" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border shadow-2xl p-2">
                    <SelectItem value="Skin" className="rounded-lg py-3 cursor-pointer">Dermatological (Skin)</SelectItem>
                    <SelectItem value="Brain" className="rounded-lg py-3 cursor-pointer">Neurological (Brain)</SelectItem>
                    <SelectItem value="Lung" className="rounded-lg py-3 cursor-pointer">Pulmonary (Lung)</SelectItem>
                    <SelectItem value="Heart" className="rounded-lg py-3 cursor-pointer">Cardiological (Heart)</SelectItem>
                    <SelectItem value="Abdomen" className="rounded-lg py-3 cursor-pointer">Gastrointestinal (Abdomen)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};