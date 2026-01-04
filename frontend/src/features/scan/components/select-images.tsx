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
    isFileDropItem,
    Modal,
    ModalOverlay,
    useDragAndDrop,
} from "react-aria-components";

interface ImageItem {
    id: string;
    url: string;
    name: string;
}

export const SelectImages = () => {
    const [items, setItems] = useState<ImageItem[]>([]);
    const [zoomImage, setZoomImage] = useState<ImageItem | null>(null);

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Shared handler for both Click and Drop
    const processFiles = (files: File[]) => {
        const newFiles = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            name: file.name,
        }));
        setItems((prev) => [...prev, ...newFiles].slice(0, 6));
    };

    const { dragAndDropHooks } = useDragAndDrop({
        acceptedDragTypes: ["image/jpeg", "image/png"],
        async onRootDrop(e) {
            const files = await Promise.all(
                e.items.filter(isFileDropItem).map((item) => item.getFile()),
            );
            processFiles(files);
        },
    });

    return (
        <div className="w-full space-y-4">
            <div className="relative group">
                <GridList
                    aria-label="Image upload grid"
                    items={items}
                    dragAndDropHooks={dragAndDropHooks}
                    className={cn(
                        "grid grid-cols-3 gap-4 p-4 min-h-[200px] rounded-lg border-2 border-dashed border-muted transition-colors",
                        "drop-target:border-primary drop-target:bg-primary/5", // Visual feedback for DND
                        items.length === 0 &&
                            "flex items-center justify-center",
                    )}
                >
                    {(item) => (
                        <GridListItem
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
                                onPress={() => removeItem(item.id)}
                                className="absolute top-1 right-1 z-20 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md outline-none"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </GridListItem>
                    )}
                </GridList>

                {/* Empty State UI & Click Handler */}
                {items.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <UploadCloud className="h-10 w-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">
                            Click or Drop up to 6 images
                        </p>

                        {/* This FileTrigger is absolute-positioned to cover the area.
                          We use 'pointer-events-auto' so it can be clicked, 
                          but the GridList underneath still sees the 'drop' event.
                        */}
                        <FileTrigger
                            allowsMultiple
                            acceptedFileTypes={["image/jpeg", "image/png"]}
                            onSelect={(e) => e && processFiles(Array.from(e))}
                        >
                            <Button
                                aria-label="Upload images"
                                className="absolute inset-0 w-full h-full bg-transparent outline-none cursor-pointer pointer-events-auto"
                            />
                        </FileTrigger>
                    </div>
                )}
            </div>

            {/* Modal components remain the same as your original snippet */}
            <ModalOverlay
                isOpen={!!zoomImage}
                onOpenChange={() => setZoomImage(null)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            >
                <Modal className="max-w-4xl w-full max-h-[90vh] outline-none">
                    <Dialog className="relative outline-none">
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
