
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

type UserRole = "borrower" | "lender";

interface UserRoleContextProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  isWalletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress: string | null;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const useUserRole = (): UserRoleContextProps => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};

interface UserRoleProviderProps {
  children: ReactNode;
}

export const UserRoleProvider: React.FC<UserRoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole");
    return (savedRole as UserRole) || "borrower";
  });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Save role to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

  const toggleRole = () => {
    const newRole = role === "borrower" ? "lender" : "borrower";
    setRole(newRole);
    toast.success(`Switched to ${newRole} mode`);
  };

  // Mock wallet connection - In a real app, this would connect to NEAR wallet
  const connectWallet = () => {
    // Mock implementation - would be replaced with actual NEAR wallet connection
    const mockAddress = "near.testaccount.near";
    setIsWalletConnected(true);
    setWalletAddress(mockAddress);
    toast.success("Wallet connected successfully");
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress(null);
    toast.info("Wallet disconnected");
  };

  const value = {
    role,
    setRole,
    toggleRole,
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    walletAddress,
  };

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>;
};
