
import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/contexts/user-role-context";

interface LoanInvestmentProps {
  loanAmount: number;
  fundedAmount: number;
  currency: string;
  onInvestmentSuccess?: (amount: number) => void;
}

export function LoanInvestment({ 
  loanAmount, 
  fundedAmount, 
  currency, 
  onInvestmentSuccess 
}: LoanInvestmentProps) {
  const { toast } = useToast();
  const { isWalletConnected } = useUserRole();
  const [investmentAmount, setInvestmentAmount] = useState<number>(10);
  const remainingAmount = loanAmount - fundedAmount;
  
  const handleInvestmentChange = (value: number[]) => {
    setInvestmentAmount(value[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= remainingAmount) {
      setInvestmentAmount(value);
    }
  };
  
  const handleInvest = () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet no conectada",
        description: "Debes conectar tu wallet de NEAR para invertir en este préstamo.",
        variant: "destructive",
      });
      return;
    }
    
    // Aquí iría la lógica para realizar la transacción en la blockchain
    toast({
      title: "Inversión enviada",
      description: `Has invertido ${investmentAmount} ${currency} en este préstamo.`,
    });
    
    // Llamar al callback de éxito si existe
    if (onInvestmentSuccess) {
      onInvestmentSuccess(investmentAmount);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Monto a invertir</span>
        <span className="text-sm text-muted-foreground">
          Máx: {remainingAmount} {currency}
        </span>
      </div>
      
      <div className="relative">
        <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        <Input
          type="number"
          className="pl-10"
          value={investmentAmount}
          onChange={handleInputChange}
          min={1}
          max={remainingAmount}
        />
      </div>
      
      <Slider
        defaultValue={[10]}
        max={remainingAmount}
        step={1}
        value={[investmentAmount]}
        onValueChange={handleInvestmentChange}
      />
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Rendimiento estimado:</span>
          <span className="font-medium">{(investmentAmount * 0.055).toFixed(2)} {currency}/año</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Periodo:</span>
          <span className="font-medium">12 meses</span>
        </div>
      </div>
      
      <Button 
        onClick={handleInvest} 
        className="w-full"
      >
        Invertir {investmentAmount} {currency}
      </Button>
    </div>
  );
}
