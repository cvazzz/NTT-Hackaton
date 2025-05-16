import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "../../hooks/use-toast";
import { Coins, ArrowRight, Info, CheckCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

// Datos de ejemplo para las juntas de inversión
const mockBoardFunds = [
  {
    id: 1,
    boardName: "Inversores en Tecnología Blockchain",
    totalFunds: 5000,
    myContribution: 500,
    members: 8,
    currency: "NEAR",
    fundingGoal: 10000,
    minContribution: 100,
  },
  {
    id: 2,
    boardName: "Aceleradora de Startups SaaS",
    totalFunds: 8500,
    myContribution: 1000,
    members: 12,
    currency: "NEAR",
    fundingGoal: 15000,
    minContribution: 250,
  }
];

// Datos de ejemplo para el historial de depósitos
const mockDepositHistory = [
  {
    id: 1,
    boardId: 1,
    amount: 300,
    currency: "NEAR",
    date: "2023-10-15T10:30:00",
    status: "completado",
    txHash: "0x123abc..."
  },
  {
    id: 2,
    boardId: 1,
    amount: 200,
    currency: "NEAR",
    date: "2023-09-28T14:45:00",
    status: "completado",
    txHash: "0x456def..."
  },
  {
    id: 3,
    boardId: 2,
    amount: 1000,
    currency: "NEAR",
    date: "2023-10-05T09:15:00",
    status: "completado",
    txHash: "0x789ghi..."
  }
];

export function InvestmentDeposit() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-boards");
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);

  const handleDeposit = () => {
    if (!depositAmount || !selectedBoard) return;

    // En una implementación real, esto enviaría la transacción al blockchain
    toast({
      title: "Depósito realizado",
      description: `Has depositado ${depositAmount} NEAR en la junta de inversión.`,
    });
    
    setDepositDialogOpen(false);
    setDepositAmount("");
  };

  const openDepositDialog = (boardId: number) => {
    setSelectedBoard(boardId);
    setDepositDialogOpen(true);
  };

  const getSelectedBoardDetails = () => {
    return mockBoardFunds.find(board => board.id === selectedBoard);
  };

  const calculateFundingProgress = (board: typeof mockBoardFunds[0]) => {
    return Math.round((board.totalFunds / board.fundingGoal) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Depósitos en Juntas</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-boards">Mis Juntas</TabsTrigger>
          <TabsTrigger value="history">Historial de Depósitos</TabsTrigger>
        </TabsList>

        <TabsContent value="my-boards" className="space-y-4">
          {mockBoardFunds.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockBoardFunds.map((board) => (
                <Card key={board.id}>
                  <CardHeader>
                    <CardTitle>{board.boardName}</CardTitle>
                    <CardDescription>
                      {board.members} miembros · Contribución mínima: {board.minContribution} {board.currency}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progreso de Financiamiento</span>
                        <span className="text-sm font-medium">{calculateFundingProgress(board)}%</span>
                      </div>
                      <Progress value={calculateFundingProgress(board)} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Fondos Totales</p>
                        <p className="text-lg font-bold">{board.totalFunds} {board.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Mi Contribución</p>
                        <p className="text-lg font-bold">{board.myContribution} {board.currency}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Objetivo de Financiamiento</p>
                      <p className="text-lg font-bold">{board.fundingGoal} {board.currency}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => openDepositDialog(board.id)} 
                      className="w-full"
                    >
                      <Coins className="mr-2 h-4 w-4" /> Depositar Fondos
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No perteneces a ninguna junta</h3>
              <p className="text-muted-foreground mb-4">Únete a una junta de inversión para empezar a depositar fondos.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockDepositHistory.length > 0 ? (
            <div className="space-y-4">
              {mockDepositHistory.map((deposit) => {
                const board = mockBoardFunds.find(b => b.id === deposit.boardId);
                
                return (
                  <Card key={deposit.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{board?.boardName}</CardTitle>
                          <CardDescription>
                            {new Date(deposit.date).toLocaleDateString()} a las {new Date(deposit.date).toLocaleTimeString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500">Completado</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{deposit.amount} {deposit.currency}</span>
                        <Button variant="outline" size="sm" className="h-8">
                          Ver Transacción <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No hay historial de depósitos</h3>
              <p className="text-muted-foreground">Cuando realices depósitos en juntas de inversión, aparecerán aquí.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Depositar Fondos</DialogTitle>
            <DialogDescription>
              Deposita fondos en la cuenta conjunta de la junta de inversión.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="board-name">Junta de Inversión</Label>
              <Input 
                id="board-name" 
                value={getSelectedBoardDetails()?.boardName || ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Cantidad a Depositar (NEAR)</Label>
              <Input 
                id="deposit-amount" 
                type="number"
                min={getSelectedBoardDetails()?.minContribution || 0}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder={`Mínimo: ${getSelectedBoardDetails()?.minContribution || 0} NEAR`}
              />
              <p className="text-xs text-muted-foreground">
                Contribución mínima: {getSelectedBoardDetails()?.minContribution || 0} NEAR
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDepositDialogOpen(false)}>Cancelar</Button>
            <Button 
              onClick={handleDeposit} 
              disabled={!depositAmount || parseFloat(depositAmount) < (getSelectedBoardDetails()?.minContribution || 0)}
            >
              Depositar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}