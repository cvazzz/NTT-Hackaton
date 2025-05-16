import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { Users, Calendar, TrendingUp, Search, Building, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvestmentBoardsService, InvestmentBoard, PastLoan } from "@/services/investment-boards-service";

export function InvestmentBoardsExplorer() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedBoard, setSelectedBoard] = useState<InvestmentBoard | null>(null);
  const [showBoardDetails, setShowBoardDetails] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    purpose: "",
    amount: "",
    term: "",
    description: ""
  });
  
  // Obtener datos de juntas y préstamos del servicio compartido
  const investmentBoards = InvestmentBoardsService.getAllBoards();
  const pastLoans = InvestmentBoardsService.getPastLoans();

  const handleViewBoard = (board: InvestmentBoard) => {
    setSelectedBoard(board);
    setShowBoardDetails(true);
  };

  const handleRequestFunding = () => {
    if (!selectedBoard) return;
    
    setShowBoardDetails(false);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = () => {
    // En una implementación real, esto enviaría la solicitud al backend
    toast({
      title: "Solicitud enviada",
      description: `Tu solicitud de financiamiento ha sido enviada a ${selectedBoard?.name}.`,
    });
    
    setShowRequestForm(false);
    setRequestFormData({
      purpose: "",
      amount: "",
      term: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Juntas de Inversión</h2>
        <Button variant="outline" asChild>
          <Link to="/startup-requirements">
            <FileText className="mr-2 h-4 w-4" /> Requisitos de Startup
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Encuentra Financiamiento para tu Startup</CardTitle>
          <CardDescription>
            Explora juntas de inversión, revisa su historial y solicita financiamiento directamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar juntas por nombre o enfoque..." 
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="explore">Explorar Juntas</TabsTrigger>
          <TabsTrigger value="my-requests">Mis Solicitudes</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {investmentBoards.map((board) => (
              <Card key={board.id}>
                <div 
                  className={`h-1 w-full bg-gradient-to-r ${board.risk === "bajo" ? "from-green-400 to-green-600" : "from-yellow-400 to-yellow-600"}`}
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{board.name}</CardTitle>
                    <Badge className="ml-2" variant="secondary">{board.matchScore}% match</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{board.members} miembros</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground mb-3">{board.focus}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Total Invertido</p>
                      <p className="text-sm font-bold">{board.totalInvested} {board.currency}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Retorno Promedio</p>
                      <div className="flex items-center">
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        <p className="text-sm font-bold">{board.averageReturn}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleViewBoard(board)}
                  >
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No tienes solicitudes activas</h3>
            <p className="text-muted-foreground mb-4">
              Explora las juntas de inversión y solicita financiamiento para tu startup.
            </p>
            <Button onClick={() => setActiveTab("explore")}>
              Explorar Juntas
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Diálogo de detalles de la junta */}
      <Dialog open={showBoardDetails} onOpenChange={setShowBoardDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedBoard?.name}</DialogTitle>
            <DialogDescription>{selectedBoard?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Miembros</p>
                <p className="text-lg font-bold">{selectedBoard?.members}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invertido</p>
                <p className="text-lg font-bold">{selectedBoard?.totalInvested} {selectedBoard?.currency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Retorno Promedio</p>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-lg font-bold">{selectedBoard?.averageReturn}%</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-semibold mb-2">Historial de Financiamientos</h4>
              <div className="space-y-3">
                {pastLoans.map((loan) => (
                  <Card key={loan.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-base">{loan.startupName}</CardTitle>
                          <CardDescription>{loan.purpose}</CardDescription>
                        </div>
                        <Badge 
                          className={loan.status === "completado" ? 
                            "bg-green-500 hover:bg-green-500/80 text-white" : 
                            "bg-blue-500 hover:bg-blue-500/80 text-white"}
                        >
                          {loan.status === "completado" ? "Completado" : "Activo"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Monto</p>
                          <p className="font-medium">{loan.amount} {loan.currency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Plazo</p>
                          <p className="font-medium">{loan.term}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Retorno</p>
                          <p className="font-medium">{loan.returnRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBoardDetails(false)}>Cerrar</Button>
            <Button onClick={handleRequestFunding}>Solicitar Financiamiento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de solicitud de financiamiento */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Financiamiento</DialogTitle>
            <DialogDescription>
              Completa el formulario para solicitar financiamiento a {selectedBoard?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Propósito del Financiamiento</Label>
              <Input 
                id="purpose" 
                value={requestFormData.purpose}
                onChange={(e) => setRequestFormData({...requestFormData, purpose: e.target.value})}
                placeholder="Ej: Desarrollo de Producto, Expansión de Mercado"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Monto (NEAR)</Label>
                <Input 
                  id="amount" 
                  type="number"
                  value={requestFormData.amount}
                  onChange={(e) => setRequestFormData({...requestFormData, amount: e.target.value})}
                  placeholder="Ej: 1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Plazo (meses)</Label>
                <Input 
                  id="term" 
                  type="number"
                  value={requestFormData.term}
                  onChange={(e) => setRequestFormData({...requestFormData, term: e.target.value})}
                  placeholder="Ej: 12"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descripción del Proyecto</Label>
              <Textarea 
                id="description" 
                value={requestFormData.description}
                onChange={(e) => setRequestFormData({...requestFormData, description: e.target.value})}
                placeholder="Describe tu startup y cómo utilizarás el financiamiento..."
                rows={5}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestForm(false)}>Cancelar</Button>
            <Button onClick={handleSubmitRequest}>Enviar Solicitud</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}