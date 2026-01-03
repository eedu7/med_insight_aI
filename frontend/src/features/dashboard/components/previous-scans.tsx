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

export const PreviousScans = () => {
    const { open } = useSidebar();

    return (
        <Activity mode={open ? "visible" : "hidden"}>
            <SidebarGroup className="flex-1 flex flex-col min-h-0">
                <SidebarGroupLabel>Previous Scans</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="#">Lorem ipsum dolor sit.</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </Activity>
    );
};
