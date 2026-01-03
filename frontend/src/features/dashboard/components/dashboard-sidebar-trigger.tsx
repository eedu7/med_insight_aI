"use client";

import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { SidebarIcon } from "lucide-react";

export const DashboardSidebarTrigger = () => {
    const { toggleSidebar } = useSidebar();
    return (
        <SidebarMenuButton onClick={toggleSidebar}>
            <SidebarIcon />
            <span>MedInsight AI</span>
        </SidebarMenuButton>
    );
};
