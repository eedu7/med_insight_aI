"use client";

import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";
import {
    Button,
    Dialog,
    FileTrigger,
    GridList,
    GridListItem,
    Heading,
    Modal,
    ModalOverlay,
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

export const SelectImages = ({
    items,
    onProcessFiles,
    onRemoveItem,
}: SelectImagesProps) => {
    const [zoomImage, setZoomImage] = useState<ImageItem | null>(null);

    return (
        <div className="w-full space-y-4">
            <div className="relative group">
                <GridList
                    aria-label="Image upload grid"
                    items={items}
                    className={cn(
                        "grid grid-cols-3 gap-4 p-4 min-h-50 rounded-lg border-2 border-dashed border-muted transition-colors",
                        "drop-target:border-primary drop-target:bg-primary/5",
                        items.length === 0 && "flex items-center justify-center",
                    )}
                >
                    {(item) => (
                        <GridListItem
                            id={item.id}
                            textValue={item.name}
                            className="relative group aspect-square rounded-md overflow-hidden border bg-background cursor-pointer"
                        >
                            <div
                                className="w-full h-full"
                                onClick={() => setZoomImage(item)}
                            >
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <Button
                                onPress={() => onRemoveItem(item.id)}
                                className="absolute top-1 right-1 z-20 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md outline-none"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </GridListItem>
                    )}
                </GridList>

                {items.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <UploadCloud className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                            Click or Drop up to 6 images
                        </p>

                        <FileTrigger
                            allowsMultiple
                            acceptedFileTypes={["image/jpeg", "image/png"]}
                            onSelect={(e) =>
                                e && onProcessFiles(Array.from(e))
                            }
                        >
                            <Button
                                aria-label="Upload images"
                                className="absolute inset-0 w-full h-full bg-transparent outline-none cursor-pointer pointer-events-auto"
                            />
                        </FileTrigger>
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            <ModalOverlay
                isOpen={!!zoomImage}
                onOpenChange={() => setZoomImage(null)}
                isDismissable // <--- ADD THIS
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <Modal className="max-w-4xl w-full max-h-[90vh] outline-none">
                    <Dialog className="relative outline-none flex items-center justify-center">
                        {({ close }) => (
                            <>
                                <Heading slot="title" className="sr-only">
                                    Image Preview
                                </Heading>

                                <Button
                                    onPress={close}
                                    className="absolute -top-10 right-0 text-white flex items-center gap-1 hover:text-gray-300 outline-none"
                                >
                                    <X className="h-5 w-5" /> Close
                                </Button>

                                <img
                                    src={zoomImage?.url}
                                    alt={zoomImage?.name}
                                    onClick={(e) => e.stopPropagation()}
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                            </>
                        )}
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
};
