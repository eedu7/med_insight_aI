import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";

export function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
