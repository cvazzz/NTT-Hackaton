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
import { Users, Plus, Check, X, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { InvestmentBoardsService } from "@/services/investment-boards-service";


export function InvestmentBoard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-boards");
  const [newBoardData, setNewBoardData] = useState({
    name: "",
    description: "",
    investmentFocus: ""
  });
  
  // Obtener datos de juntas e invitaciones del servicio compartido
  const boards = InvestmentBoardsService.getAllBoards();
  const invitations = InvestmentBoardsService.getBoardInvitations();

  const handleCreateBoard = () => {
    // En una implementación real, esto enviaría los datos al backend
    toast({
      title: "Junta creada",
      description: `La junta ${newBoardData.name} ha sido creada exitosamente.`,
    });
    
    // Reiniciar el formulario
    setNewBoardData({
      name: "",
      description: "",
      investmentFocus: ""
    });
  };

  const handleAcceptInvitation = (invitationId: number) => {
    // En una implementación real, esto enviaría la aceptación al backend
    toast({
      title: "Invitación aceptada",
      description: "Te has unido a la junta de inversión.",
    });
  };

  const handleDeclineInvitation = (invitationId: number) => {
    // En una implementación real, esto rechazaría la invitación en el backend
    toast({
      title: "Invitación rechazada",
      description: "Has rechazado la invitación a la junta.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Juntas de Inversión</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Crear Junta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Junta de Inversión</DialogTitle>
              <DialogDescription>
                Las juntas de inversión permiten a múltiples inversores evaluar y financiar colectivamente startups.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="board-name">Nombre de la Junta</Label>
                <Input 
                  id="board-name" 
                  value={newBoardData.name}
                  onChange={(e) => setNewBoardData({...newBoardData, name: e.target.value})}
                  placeholder="Ej: Inversores en Tecnología Blockchain"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="board-description">Descripción</Label>
                <Textarea 
                  id="board-description" 
                  value={newBoardData.description}
                  onChange={(e) => setNewBoardData({...newBoardData, description: e.target.value})}
                  placeholder="Describe el propósito y enfoque de esta junta de inversión"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="investment-focus">Enfoque de Inversión</Label>
                <Input 
                  id="investment-focus" 
                  value={newBoardData.investmentFocus}
                  onChange={(e) => setNewBoardData({...newBoardData, investmentFocus: e.target.value})}
                  placeholder="Ej: Startups de tecnología, Fase semilla"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateBoard}>Crear Junta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-boards">Mis Juntas</TabsTrigger>
          <TabsTrigger value="invitations">Invitaciones</TabsTrigger>
          <TabsTrigger value="discover">Descubrir</TabsTrigger>
        </TabsList>

        <TabsContent value="my-boards" className="space-y-4">
          {boards.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {boards.map((board) => (
                <Card key={board.id}>
                  <CardHeader>
                    <CardTitle>{board.name}</CardTitle>
                    <CardDescription>
                      {board.members} miembros · {board.activeLoanRequests} solicitudes activas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{board.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Invertido</p>
                        <p className="text-lg font-bold">{board.totalInvested} {board.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Retorno Promedio</p>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <p className="text-lg font-bold">{board.averageReturn}%</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Próxima Reunión</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <p>{new Date(board.nextMeeting).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/boards/${board.id}`}>Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No perteneces a ninguna junta</h3>
              <p className="text-muted-foreground mb-4">Crea una nueva junta o únete a una existente para empezar.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Crear Junta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* Contenido del diálogo (igual que arriba) */}
                </DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          {invitations.length > 0 ? (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{invitation.boardName}</CardTitle>
                    <CardDescription>
                      Invitado por {invitation.invitedBy} el {new Date(invitation.sentAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleDeclineInvitation(invitation.id)}>
                      <X className="mr-2 h-4 w-4" /> Rechazar
                    </Button>
                    <Button onClick={() => handleAcceptInvitation(invitation.id)}>
                      <Check className="mr-2 h-4 w-4" /> Aceptar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No tienes invitaciones pendientes</h3>
              <p className="text-muted-foreground">Cuando alguien te invite a una junta, aparecerá aquí.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Descubre Juntas de Inversión</h3>
            <p className="text-muted-foreground mb-4">Próximamente: Explora juntas públicas y solicita unirte a ellas.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}