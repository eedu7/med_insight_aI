import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {
    PlusSquareIcon,
    ScanSearchIcon
} from "lucide-react";
import Link from "next/link";
import { DashboardLogout } from "./dashboard-logout";
import { DashboardSidebarTrigger } from "./dashboard-sidebar-trigger";
import { DashboardUpgradeToPro } from "./dashboard-upgrade-to-pro";
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
                        <DashboardUpgradeToPro />
                    </SidebarMenuItem>
                    {/* Log Out */}
                    <SidebarMenuItem>
                        <DashboardLogout />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
