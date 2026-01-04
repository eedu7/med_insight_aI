"use client";

import { cn } from "@/lib/utils";
import { FilePlus2, UploadCloud, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import {
    Button,
    Dialog,
    FileTrigger,
    GridList,
    GridListItem, Modal,
    ModalOverlay
} from "react-aria-components";

interface ImageItem {
    id: string;
    url: string;
    name: string;
}

interface SelectImagesProps {
    items: ImageItem[];
    onProcessFiles: (files: File[]) => void;
    onRemoveItem: (id: string) => void;
}

export const SelectImages = ({ items, onProcessFiles, onRemoveItem }: SelectImagesProps) => {
    const [zoomImage, setZoomImage] = useState<ImageItem | null>(null);

    return (
        <div className="w-full">
            <div className="relative group">
                <GridList
                    aria-label="Image upload grid"
                    items={items}
                    className={cn(
                        "grid grid-cols-2 md:grid-cols-3 gap-3 min-h-64 transition-all",
                        items.length === 0 && "flex items-center justify-center border-2 border-dashed border-border rounded-[1.5rem] bg-muted/20 hover:bg-emerald-500/5 hover:border-emerald-500/40 transition-colors"
                    )}
                >
                    {(item) => (
                        <GridListItem
                            id={item.id}
                            className="relative group aspect-square rounded-xl overflow-hidden border border-border bg-card cursor-pointer shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="w-full h-full" onClick={() => setZoomImage(item)}>
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                        <ZoomIn className="text-white h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onPress={() => onRemoveItem(item.id)}
                                className="absolute top-1.5 right-1.5 z-20 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg outline-none hover:bg-red-600 active:scale-90"
                            >
                                <X className="h-2.5 w-2.5" />
                            </Button>
                        </GridListItem>
                    )}
                </GridList>

                {items.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
                        <div className="p-4 bg-emerald-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-500">
                            <UploadCloud className="h-8 w-8 text-emerald-600" />
                        </div>
                        <p className="text-sm font-bold text-foreground">Drop diagnostic scans here</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-mono">Max 6 Objects • PNG/JPG</p>

                        <FileTrigger
                            allowsMultiple
                            acceptedFileTypes={["image/jpeg", "image/png"]}
                            onSelect={(e) => e && onProcessFiles(Array.from(e))}
                        >
                            <Button className="absolute inset-0 w-full h-full bg-transparent outline-none cursor-pointer pointer-events-auto" />
                        </FileTrigger>
                    </div>
                )}

                {items.length > 0 && items.length < 6 && (
                    <div className="flex justify-center mt-6">
                        <FileTrigger
                            allowsMultiple
                            acceptedFileTypes={["image/jpeg", "image/png"]}
                            onSelect={(e) => e && onProcessFiles(Array.from(e))}
                        >
                            <Button className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-500 flex items-center gap-2 transition-all hover:gap-3">
                                <FilePlus2 className="h-4 w-4" /> Add supplementary scans
                            </Button>
                        </FileTrigger>
                    </div>
                )}
            </div>

            <ModalOverlay
                isOpen={!!zoomImage}
                onOpenChange={() => setZoomImage(null)}
                isDismissable
                className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
            >
                <Modal className="max-w-4xl w-full max-h-[90vh] outline-none">
                    <Dialog className="relative outline-none flex flex-col items-center gap-4">
                        <Button
                            onPress={() => setZoomImage(null)}
                            className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground flex items-center gap-2 outline-none text-xs font-bold uppercase tracking-widest"
                        >
                            Dismiss <X className="h-4 w-4" />
                        </Button>
                        <img
                            src={zoomImage?.url}
                            alt={zoomImage?.name}
                            className="max-w-full max-h-[80vh] object-contain rounded-[2rem] shadow-2xl border border-border"
                        />
                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{zoomImage?.name}</p>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
};