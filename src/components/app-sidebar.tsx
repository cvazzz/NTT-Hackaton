
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  CreditCard, 
  BarChart2, 
  Calendar, 
  Search, 
  Settings, 
  HelpCircle,
  Wallet,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/contexts/user-role-context";

export function AppSidebar() {
  const { role, isWalletConnected, connectWallet, walletAddress } = useUserRole();

  const borrowerMenuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Request Loan", url: "/request-loan", icon: FileText },
    { title: "My Loans", url: "/my-loans", icon: CreditCard },
    { title: "Repayment Calendar", url: "/repayment-calendar", icon: Calendar },
    { title: "Juntas de Inversión", url: "/investment-boards-explorer", icon: Users },
  ];

  const lenderMenuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Explore Requests", url: "/explore-requests", icon: Search },
    { title: "My Investments", url: "/my-investments", icon: BarChart2 },
    { title: "Juntas de Inversión", url: "/boards", icon: Users },
  ];

  const commonMenuItems = [
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Help Center", url: "/help", icon: HelpCircle },
  ];

  const menuItems = role === "borrower" ? borrowerMenuItems : lenderMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
            NL
          </div>
          <span className="font-bold text-xl text-sidebar-foreground">NEAR Loans</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {!isWalletConnected ? (
          <div className="p-4">
            <Button 
              variant="outline" 
              onClick={connectWallet} 
              className="w-full flex items-center gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect NEAR Wallet</span>
            </Button>
          </div>
        ) : (
          <div className="px-4 py-2 mb-2">
            <div className="bg-sidebar-accent rounded-md p-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <div className="text-sidebar-foreground text-sm overflow-hidden text-ellipsis">
                {walletAddress}
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>{role === "borrower" ? "Borrower Tools" : "Lender Tools"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 text-xs text-sidebar-foreground/70">
          <p>© 2025 NEAR Loans Platform</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
