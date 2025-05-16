
import React from "react";
import { Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/contexts/user-role-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  const { role, toggleRole, isWalletConnected, disconnectWallet } = useUserRole();

  return (
    <header className="bg-background border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">
          {role === "borrower" ? "Borrower Dashboard" : "Lender Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="gap-2" onClick={toggleRole}>
          Switch to {role === "borrower" ? "Lender" : "Borrower"} Mode
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 py-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium">New loan opportunity</span>
                  <Badge variant="outline" className="ml-auto">New</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Check out the latest loan requests that match your preferences.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 py-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium">Loan request updated</span>
                  <Badge variant="outline" className="ml-auto">1h ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">A borrower has updated their loan request with additional information.</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start gap-1 py-2">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium">Payment received</span>
                  <Badge variant="outline" className="ml-auto">3h ago</Badge>
                </div>
                <p className="text-sm text-muted-foreground">You've received a loan repayment of 50 NEAR.</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {isWalletConnected && (
          <Button variant="outline" size="sm" onClick={disconnectWallet}>
            Disconnect Wallet
          </Button>
        )}
      </div>
    </header>
  );
}
