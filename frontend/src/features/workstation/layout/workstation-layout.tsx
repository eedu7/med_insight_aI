import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";
import { WorkstationSidebar } from "../components/workstation-sidebar";

export function WorkstationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen={false}>
            <WorkstationSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
