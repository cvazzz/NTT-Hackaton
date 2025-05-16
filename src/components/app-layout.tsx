
import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserRole } from "@/contexts/user-role-context";

export function AppLayout() {
  const { isWalletConnected } = useUserRole();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="sticky top-0 z-30">
            <div className="flex items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <SidebarTrigger className="h-12 w-12 flex items-center justify-center lg:hidden" />
              <AppHeader />
            </div>
          </div>
          
          <main className="p-6">
            {!isWalletConnected ? (
              <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                <div className="bg-card border rounded-lg p-8 max-w-md shadow-sm">
                  <h2 className="text-2xl font-bold mb-4">Connect Your NEAR Wallet</h2>
                  <p className="text-muted-foreground mb-6">
                    To access the NEAR Loans platform, you need to connect your NEAR wallet.
                    This allows you to interact securely with the blockchain.
                  </p>
                  <div className="flex justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="NEAR Wallet" 
                      className="h-32 mb-6 opacity-80"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click "Connect NEAR Wallet" in the sidebar to get started.
                  </p>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
