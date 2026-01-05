"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import { useGetChats } from "@/features/chat/hooks/use-chats";
import Link from "next/link";
import { Activity } from "react";
import { MoreOptions } from "./more-options";

export const PreviousChats = () => {
    const { data, isLoading } = useGetChats();
    const { open } = useSidebar();

    return (
        <Activity mode={open ? "visible" : "hidden"}>
            <SidebarGroup className="flex-1 flex flex-col min-h-0 p-0">
                <SidebarGroupLabel className="px-4 pt-4">
                    Previous Chats
                </SidebarGroupLabel>

                <SidebarGroupContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full w-full">
                        <SidebarMenu className="px-2">
                            {
                                data?.map(({ id, title }) => (
                                    <SidebarMenuItem key={id} className="group/item">
                                        <SidebarMenuButton asChild>
                                            <Link href={`/chat/${id}`}>{title}</Link>
                                        </SidebarMenuButton>
                                        <SidebarMenuAction
                                            className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                        >
                                            <MoreOptions />
                                        </SidebarMenuAction>
                                    </SidebarMenuItem>
                                ))
                            }

                        </SidebarMenu>
                    </ScrollArea>
                </SidebarGroupContent>
            </SidebarGroup>
        </Activity>
    );
};


