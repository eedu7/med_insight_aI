"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export const PreviousScans = () => {
    const { open } = useSidebar();

    return (
        <Activity mode={open ? "visible" : "hidden"}>
            <SidebarGroup className="flex-1 flex flex-col min-h-0 p-0">
                <SidebarGroupLabel className="px-4 pt-4">
                    Previous Scans
                </SidebarGroupLabel>
                <SidebarGroupContent className="flex-1 min-h-0">
                    <ScrollArea className="h-full w-full">
                        <SidebarMenu className="px-2">
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="#">Sit amet consectetur.</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </ScrollArea>
                </SidebarGroupContent>
            </SidebarGroup>
        </Activity>
    );
};
