"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import {
    ArrowRightIcon,
    ClockIcon,
    MessageSquareIcon,
    ScanIcon, // Represents the cancer detection scanner
    SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const RECENT_SEARCHES = [
    {
        id: 1,
        title: "Medical consultation regarding skin marks",
        type: "chat",
        date: "2h ago",
    },
    {
        id: 2,
        title: "Dermoscopic Analysis: Patient_Ref_092",
        type: "scan",
        date: "Yesterday",
    },
    {
        id: 3,
        title: "Clarification on screening process",
        type: "chat",
        date: "Jan 1",
    },
    {
        id: 4,
        title: "Scan Result: Anterior Thorax Area",
        type: "scan",
        date: "Dec 30",
    },
];

export const DashboardSearch = () => {
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    const filtered = RECENT_SEARCHES.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SidebarMenuButton className="hover:bg-accent transition-all duration-200 border border-transparent">
                    <SearchIcon className="size-4" />
                    <span>Search records...</span>
                </SidebarMenuButton>
            </DialogTrigger>

            <DialogContent className="sm:max-w-162.5 p-0 gap-0 border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
                <DialogHeader className="px-4 py-4 border-b border-neutral-100 dark:border-neutral-900">
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <div className="flex items-center gap-3">
                        <SearchIcon className="size-5 text-neutral-400" />
                        <Input
                            placeholder="Search chats and medical scans..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-9 w-full bg-transparent border-none focus-visible:ring-0 text-lg p-0 placeholder:text-neutral-300"
                            autoFocus
                        />
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-112.5">
                    <div className="p-2">
                        <h4 className="px-3 py-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {query ? "Filtered Results" : "Recent Activity"}
                        </h4>

                        <div className="space-y-1">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => setOpen(false)}
                                        className="group flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                                            {item.type === "scan" ? (
                                                <ScanIcon className="size-4 text-neutral-900 dark:text-neutral-100" />
                                            ) : (
                                                <MessageSquareIcon className="size-4 text-neutral-500" />
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-1 overflow-hidden">
                                            <span className="truncate font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                                {item.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-tight text-neutral-500">
                                                    {item.type}
                                                </span>
                                                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                                                    <ClockIcon className="size-3" />
                                                    {item.date}
                                                </span>
                                            </div>
                                        </div>

                                        <ArrowRightIcon className="size-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-neutral-400" />
                                    </button>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-neutral-500">
                                        No entries match "{query}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>

                <div className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                    <span className="text-[10px] font-medium text-neutral-400">
                        Total Records: {RECENT_SEARCHES.length}
                    </span>
                    <Link
                        href="/history"
                        className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 hover:underline decoration-2"
                    >
                        VIEW ALL HISTORY
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};
