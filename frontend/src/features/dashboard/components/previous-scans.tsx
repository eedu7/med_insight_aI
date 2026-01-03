"use client";
import {
    SidebarContent,
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
            <SidebarContent>
                <SidebarGroup>
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
            </SidebarContent>
        </Activity>
    );
};
