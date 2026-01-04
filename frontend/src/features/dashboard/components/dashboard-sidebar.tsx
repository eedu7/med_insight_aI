import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    CrownIcon,
    LogOutIcon,
    PlusSquareIcon,
    ScanSearchIcon,
    SparkleIcon,
} from "lucide-react";
import Link from "next/link";
import { DashboardSearch } from "./dashboard-search";
import { DashboardSidebarTrigger } from "./dashboard-sidebar-trigger";
import { PreviousChats } from "./previous-chats";
import { PreviousScans } from "./previous-scans";

export const DashboardSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            {/* Header */}
            <SidebarHeader>
                <SidebarMenu>
                    {/* Sidebar Trigger */}
                    <SidebarMenuItem>
                        <DashboardSidebarTrigger />
                    </SidebarMenuItem>

                    {/* New Chat */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/chat">
                                <PlusSquareIcon />
                                New Chat
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* New Scan */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/scan">
                                <ScanSearchIcon />
                                New Scan
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* Search */}
                    <SidebarMenuItem>
                        <DashboardSearch />
                    </SidebarMenuItem>
                    {/* Models */}
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/models">
                                <SparkleIcon />
                                Models
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex flex-col h-full overflow-hidden">
                {/* Previous Chats */}
                <PreviousChats />
                {/* Previous Scans */}
                <PreviousScans />
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    {/* Upgrade Plan */}
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <CrownIcon />
                            Upgrade Plan
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* Log Out */}
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LogOutIcon />
                            LogOut
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
