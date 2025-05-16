import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "../../hooks/use-toast";
import { ThumbsUp, ThumbsDown, Info, Calendar, Users, Briefcase, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

// Datos de ejemplo para las solicitudes de préstamo pendientes
const mockPendingRequests = [
  {
    id: 1,
    startupName: "TechInnovate AI",
    purpose: "Desarrollo de MVP",
    requestAmount: 5000,
    currency: "NEAR",
    term: "12 meses",
    returnRate: 8.5,
    category: "tech",
    votesRequired: 6,
    votesReceived: 4,
    votesApproved: 3,
    votesRejected: 1,
    deadline: "2023-12-15T23:59:59",
    myVote: null,
    boardId: 1,
    boardName: "Inversores en Tecnología Blockchain"
  },
  {
    id: 2,
    startupName: "EcoSolutions",
    purpose: "Expansión de mercado",
    requestAmount: 8000,
    currency: "NEAR",
    term: "18 meses",
    returnRate: 9.0,
    category: "sustainability",
    votesRequired: 8,
    votesReceived: 5,
    votesApproved: 4,
    votesRejected: 1,
    deadline: "2023-12-10T23:59:59",
    myVote: "approved",
    boardId: 2,
    boardName: "Aceleradora de Startups SaaS"
  },
  {
    id: 3,
    startupName: "FinTech Solutions",
    purpose: "Desarrollo de producto",
    requestAmount: 12000,
    currency: "NEAR",
    term: "24 meses",
    returnRate: 10.5,
    category: "fintech",
    votesRequired: 10,
    votesReceived: 7,
    votesApproved: 3,
    votesRejected: 4,
    deadline: "2023-12-20T23:59:59",
    myVote: "rejected",
    boardId: 1,
    boardName: "Inversores en Tecnología Blockchain"
  }
];

// Datos de ejemplo para el historial de votaciones
const mockVotingHistory = [
  {
    id: 1,
    startupName: "CloudCommerce",
    purpose: "Lanzamiento de plataforma",
    requestAmount: 7500,
    currency: "NEAR",
    term: "15 meses",
    returnRate: 9.5,
    category: "ecommerce",
    votesRequired: 8,
    votesReceived: 8,
    votesApproved: 6,
    votesRejected: 2,
    voteDate: "2023-11-05T14:30:00",
    status: "approved",
    myVote: "approved",
    boardId: 2,
    boardName: "Aceleradora de Startups SaaS"
  },
  {
    id: 2,
    startupName: "DataAnalytics Pro",
    purpose: "Contratación de equipo",
    requestAmount: 6000,
    currency: "NEAR",
    term: "12 meses",
    returnRate: 8.0,
    category: "saas",
    votesRequired: 6,
    votesReceived: 6,
    votesApproved: 2,
    votesRejected: 4,
    voteDate: "2023-10-28T09:15:00",
    status: "rejected",
    myVote: "rejected",
    boardId: 1,
    boardName: "Inversores en Tecnología Blockchain"
  }
];

export function InvestmentVoting() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [voteDialogOpen, setVoteDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [voteType, setVoteType] = useState<"approve" | "reject" | null>(null);
  const [voteComment, setVoteComment] = useState("");

  const handleVote = () => {
    if (!selectedRequest || !voteType) return;

    // En una implementación real, esto enviaría el voto al backend
    toast({
      title: voteType === "approve" ? "Préstamo aprobado" : "Préstamo rechazado",
      description: `Has ${voteType === "approve" ? "aprobado" : "rechazado"} la solicitud de préstamo.`,
    });
    
    setVoteDialogOpen(false);
    setVoteComment("");
    setSelectedRequest(null);
    setVoteType(null);
  };

  const openVoteDialog = (requestId: number, type: "approve" | "reject") => {
    setSelectedRequest(requestId);
    setVoteType(type);
    setVoteDialogOpen(true);
  };

  const getSelectedRequestDetails = () => {
    return mockPendingRequests.find(req => req.id === selectedRequest);
  };

  const calculateVoteProgress = (request: typeof mockPendingRequests[0]) => {
    return Math.round((request.votesReceived / request.votesRequired) * 100);
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} días y ${diffHours} horas`;
    } else if (diffHours > 0) {
      return `${diffHours} horas`;
    } else {
      return "Menos de 1 hora";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Votación de Préstamos</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {mockPendingRequests.length > 0 ? (
            <div className="space-y-4">
              {mockPendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{request.startupName}</CardTitle>
                        <CardDescription>
                          {request.purpose} · {request.boardName}
                        </CardDescription>
                      </div>
                      <Badge className="ml-2">
                        {request.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Monto Solicitado</p>
                        <p className="text-lg font-bold">{request.requestAmount} {request.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tasa de Retorno</p>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <p className="text-lg font-bold">{request.returnRate}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progreso de Votación</span>
                        <span className="text-sm font-medium">
                          {request.votesReceived} de {request.votesRequired} votos
                        </span>
                      </div>
                      <Progress value={calculateVoteProgress(request)} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Tiempo restante: {getTimeRemaining(request.deadline)}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-sm mr-2">{request.votesApproved}</span>
                        <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-sm">{request.votesRejected}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {request.myVote === null ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-1/2 mr-2"
                          onClick={() => openVoteDialog(request.id, "reject")}
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" /> Rechazar
                        </Button>
                        <Button 
                          className="w-1/2"
                          onClick={() => openVoteDialog(request.id, "approve")}
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" /> Aprobar
                        </Button>
                      </>
                    ) : (
                      <div className="w-full flex items-center justify-center">
                        <Badge className={request.myVote === "approved" ? "bg-green-500" : "bg-red-500"}>
                          {request.myVote === "approved" ? (
                            <>
                              <ThumbsUp className="mr-2 h-4 w-4" /> Aprobado
                            </>
                          ) : (
                            <>
                              <ThumbsDown className="mr-2 h-4 w-4" /> Rechazado
                            </>
                          )}
                        </Badge>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No hay solicitudes pendientes</h3>
              <p className="text-muted-foreground mb-4">No hay solicitudes de préstamo pendientes para votar en este momento.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockVotingHistory.length > 0 ? (
            <div className="space-y-4">
              {mockVotingHistory.map((history) => (
                <Card key={history.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{history.startupName}</CardTitle>
                        <CardDescription>
                          {history.purpose} · {history.boardName}
                        </CardDescription>
                      </div>
                      <Badge 
                        className={history.status === "approved" ? "bg-green-500" : "bg-red-500"}
                      >
                        {history.status === "approved" ? "Aprobado" : "Rechazado"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Monto Solicitado</p>
                        <p className="text-lg font-bold">{history.requestAmount} {history.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Tasa de Retorno</p>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <p className="text-lg font-bold">{history.returnRate}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Votado el {new Date(history.voteDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-sm mr-2">{history.votesApproved}</span>
                        <ThumbsDown className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-sm">{history.votesRejected}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Badge className={history.myVote === "approved" ? "bg-green-500" : "bg-red-500"}>
                        {history.myVote === "approved" ? (
                          <>
                            <ThumbsUp className="mr-2 h-4 w-4" /> Tu voto: Aprobado
                          </>
                        ) : (
                          <>
                            <ThumbsDown className="mr-2 h-4 w-4" /> Tu voto: Rechazado
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/loan-details/${history.id}`}>
                        <Briefcase className="mr-2 h-4 w-4" /> Ver Detalles del Préstamo
                      </Link>
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
              <h3 className="text-lg font-medium">No hay historial de votaciones</h3>
              <p className="text-muted-foreground">Cuando votes en solicitudes de préstamo, aparecerán aquí.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={voteDialogOpen} onOpenChange={setVoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {voteType === "approve" ? "Aprobar Préstamo" : "Rechazar Préstamo"}
            </DialogTitle>
            <DialogDescription>
              {voteType === "approve" 
                ? "Estás a punto de aprobar esta solicitud de préstamo. Tu voto contribuirá a la decisión final de la junta."
                : "Estás a punto de rechazar esta solicitud de préstamo. Por favor, proporciona un motivo para tu decisión."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="startup-name">Startup</Label>
              <div className="font-medium">{getSelectedRequestDetails()?.startupName}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-amount">Monto Solicitado</Label>
              <div className="font-medium">
                {getSelectedRequestDetails()?.requestAmount} {getSelectedRequestDetails()?.currency}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vote-comment">Comentario (opcional)</Label>
              <Textarea 
                id="vote-comment" 
                value={voteComment}
                onChange={(e) => setVoteComment(e.target.value)}
                placeholder="Añade un comentario sobre tu decisión..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVoteDialogOpen(false)}>Cancelar</Button>
            <Button 
              onClick={handleVote} 
              className={voteType === "approve" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
            >
              {voteType === "approve" ? "Aprobar" : "Rechazar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}