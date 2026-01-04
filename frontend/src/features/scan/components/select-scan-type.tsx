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

                    <SelectItem value="prithivMLmods/open-age-detection" className="rounded-lg py-3 cursor-pointer">prithivMLmods/open-age-detection</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};