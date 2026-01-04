import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatProvider } from "@/features/chat/context/chat-context";
import type React from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ChatProvider>
            <SidebarProvider defaultOpen={false}>
                <DashboardSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </ChatProvider>
    );
}
