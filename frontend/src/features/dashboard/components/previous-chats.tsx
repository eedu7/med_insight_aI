"use client";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Activity } from "react";

export const PreviousChats = () => {
    const { open } = useSidebar();

    return (
        <Activity mode={open ? "visible" : "hidden"}>
            <SidebarGroup className="flex-1 flex flex-col min-h-0">
                <SidebarGroupLabel>Previous Chats</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {Array.from({ length: 25 }).map((_, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild>
                                    <Link href="#">Lorem ipsum dolor sit.</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </Activity>
    );
};
