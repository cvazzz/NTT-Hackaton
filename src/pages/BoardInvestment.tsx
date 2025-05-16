import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentDeposit } from "@/components/boards/investment-deposit";
import { InvestmentVoting } from "@/components/boards/investment-voting";

const BoardInvestment = () => {
  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Depósitos en Juntas</TabsTrigger>
          <TabsTrigger value="voting">Votación de Préstamos</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit" className="mt-6">
          <InvestmentDeposit />
        </TabsContent>
        <TabsContent value="voting" className="mt-6">
          <InvestmentVoting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoardInvestment;