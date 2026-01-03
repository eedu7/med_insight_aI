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
    SearchIcon,
} from "lucide-react";
import Link from "next/link";
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
                        <SidebarMenuButton>
                            <SearchIcon />
                            Search
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
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
