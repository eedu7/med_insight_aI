import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatProvider } from "@/features/chat/context/chat-context";
import { requireAuth } from "@/lib/auth";
import type React from "react";
import { DashboardSidebar } from "../components/dashboard-sidebar";

export async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireAuth()
    return (
        <ChatProvider>
            <SidebarProvider defaultOpen={false}>
                <DashboardSidebar />
                <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
        </ChatProvider>
    );
}
