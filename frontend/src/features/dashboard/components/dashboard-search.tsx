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
    ArrowRight,
    Clock,
    MessageSquare,
    Search,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

const RECENT_SEARCHES = [
    {
        id: 1,
        title: "How to implement Auth.js in Next.js 14",
        type: "chat",
        date: "2h ago",
    },
    {
        id: 2,
        title: "Data Visualization Best Practices",
        type: "chat",
        date: "Yesterday",
    },
    { id: 3, title: "Market Analysis - Q1 2026", type: "chat", date: "Jan 1" },
    { id: 4, title: "Image Generator Pro", type: "gpt", date: "Tool" },
    {
        id: 5,
        title: "Write a professional email for a job application",
        type: "chat",
        date: "Dec 28",
    },
];

export const DashboardSearch = () => {
    const [query, setQuery] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const filtered = RECENT_SEARCHES.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SidebarMenuButton className="hover:bg-accent transition-all duration-200">
                    <Search className="size-4" />
                    <span>Search chats...</span>
                </SidebarMenuButton>
            </DialogTrigger>

            <DialogContent className="sm:max-w-162.5 p-0 gap-0 border-none bg-background shadow-2xl">
                <DialogHeader className="px-4 py-4 border-b">
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <div className="flex items-center gap-3">
                        <Search className="size-5 text-muted-foreground" />
                        <Input
                            placeholder="Search your conversations..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="h-9 w-full bg-transparent border-none focus-visible:ring-0 text-lg p-0 placeholder:text-muted-foreground/60"
                            autoFocus
                        />
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-112.5">
                    <div className="p-2">
                        {/* Section Label */}
                        <h4 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {query ? "Results" : "Recent Conversations"}
                        </h4>

                        <div className="space-y-1">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <button
                                        type="button"
                                        key={item.id}
                                        onClick={() => setOpen(false)}
                                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-muted/80"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background group-hover:border-primary/30 transition-colors">
                                            {item.type === "gpt" ? (
                                                <Sparkles className="size-4 text-purple-500" />
                                            ) : (
                                                <MessageSquare className="size-4 text-muted-foreground" />
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-1 overflow-hidden">
                                            <span className="truncate font-medium text-sm">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {item.date}
                                            </span>
                                        </div>

                                        <ArrowRight className="size-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                                    </button>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        No matches found for "{query}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollArea>

                {/* Footer Tip */}
                <div className="px-4 py-3 border-t bg-muted/30 flex justify-end items-center">
                    <Link
                        href="/history"
                        className="text-[11px] font-medium text-primary hover:underline"
                    >
                        View all history
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};
