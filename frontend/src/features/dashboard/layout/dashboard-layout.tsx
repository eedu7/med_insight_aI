import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen={false}>
            <DashboardSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
