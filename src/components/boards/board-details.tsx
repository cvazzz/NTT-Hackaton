import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Users, Plus, Check, X, Calendar, TrendingUp, ThumbsUp, ThumbsDown, UserPlus, FileText, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/contexts/user-role-context";

// Datos simulados para una junta específica
const mockBoardData = {
  id: 1,
  name: "Junta de Inversión en Tecnología",
  members: [
    { id: 1, name: "carlos.near", role: "admin", joinedAt: "2025-04-15" },
    { id: 2, name: "maria.near", role: "member", joinedAt: "2025-04-16" },
    { id: 3, name: "juan.near", role: "member", joinedAt: "2025-04-20" },
    { id: 4, name: "ana.near", role: "member", joinedAt: "2025-05-01" },
    { id: 5, name: "pedro.near", role: "member", joinedAt: "2025-05-10" },
  ],
  activeLoanRequests: [
    {
      id: 101,
      startup: "techstartup.near",
      startupName: "TechInnovate",
      purpose: "Desarrollo de Software B2B",
      amount: 2000,
      currency: "NEAR",
      term: "12 months",
      votes: {
        yes: 2,
        no: 1,
        required: 4
      },
      createdAt: "2025-05-20",
      description: "Startup enfocada en desarrollar soluciones de software B2B para automatización de procesos empresariales.",
      userVote: null
    },
    {
      id: 102,
      startup: "greentech.near",
      startupName: "GreenTech Solutions",
      purpose: "Expansión de Mercado",
      amount: 3500,
      currency: "NEAR",
      term: "18 months",
      votes: {
        yes: 3,
        no: 0,
        required: 4
      },
      createdAt: "2025-05-22",
      description: "Startup de tecnología verde que busca expandir su mercado a nuevas regiones con soluciones sostenibles.",
      userVote: "yes"
    },
  ],
  pastLoanRequests: [
    {
      id: 103,
      startup: "healthapp.near",
      startupName: "HealthApp",
      purpose: "Desarrollo de Aplicación Móvil",
      amount: 1500,
      currency: "NEAR",
      term: "9 months",
      status: "approved",
      votes: {
        yes: 4,
        no: 1,
        required: 4
      },
      createdAt: "2025-05-10",
      fundedAt: "2025-05-15"
    },
    {
      id: 104,
      startup: "fooddelivery.near",
      startupName: "FoodExpress",
      purpose: "Expansión de Flota",
      amount: 2500,
      currency: "NEAR",
      term: "12 months",
      status: "rejected",
      votes: {
        yes: 2,
        no: 3,
        required: 4
      },
      createdAt: "2025-05-05",
      rejectedAt: "2025-05-12"
    },
  ],
  totalInvested: 5000,
  currency: "NEAR",
  averageReturn: 6.2,
  nextMeeting: "2025-06-15",
  description: "Grupo de inversores enfocados en startups de tecnología y software.",
  investmentFocus: "Startups de tecnología, Fase semilla"
};

export function BoardDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState("active-requests");
  const [inviteEmail, setInviteEmail] = useState("");
  const [boardData, setBoardData] = useState(mockBoardData);
  
  // Simular carga de datos
  useEffect(() => {
    // En una implementación real, aquí se cargarían los datos de la junta desde el backend
    // usando el ID proporcionado en los parámetros de la URL
    console.log(`Cargando datos para la junta con ID: ${id}`);
  }, [id]);

  const handleVote = (requestId: number, vote: "yes" | "no") => {
    // En una implementación real, esto enviaría el voto al backend
    toast({
      title: "Voto registrado",
      description: `Has votado ${vote === "yes" ? "a favor" : "en contra"} de la solicitud.`,
    });
    
    // Actualizar localmente el estado de los votos
    setBoardData(prev => ({
      ...prev,
      activeLoanRequests: prev.activeLoanRequests.map(request => {
        if (request.id === requestId) {
          const updatedVotes = { ...request.votes };
          if (request.userVote) {
            // Si ya había votado, restar el voto anterior
            updatedVotes[request.userVote] -= 1;
          }
          // Sumar el nuevo voto
          updatedVotes[vote] += 1;
          
          return {
            ...request,
            votes: updatedVotes,
            userVote: vote
          };
        }
        return request;
      })
    }));
  };

  const handleInviteMember = () => {
    // En una implementación real, esto enviaría la invitación al backend
    if (!inviteEmail.trim()) return;
    
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${inviteEmail}.`,
    });
    
    setInviteEmail("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/boards" className="text-primary hover:underline mb-2 inline-block">
            ← Volver a Juntas
          </Link>
          <h2 className="text-3xl font-bold">{boardData.name}</h2>
          <p className="text-muted-foreground">{boardData.description}</p>
        </div>
        
        {role === "lender" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Invitar Miembro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invitar a la Junta de Inversión</DialogTitle>
                <DialogDescription>
                  Invita a otros inversores a unirse a esta junta para evaluar y financiar startups colectivamente.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Dirección NEAR o Email</Label>
                  <Input 
                    id="invite-email" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="usuario.near o email@ejemplo.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleInviteMember}>Enviar Invitación</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Miembros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boardData.members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boardData.totalInvested} {boardData.currency}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Retorno Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
              <div className="text-2xl font-bold">{boardData.averageReturn}%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active-requests">Solicitudes Activas</TabsTrigger>
          <TabsTrigger value="past-requests">Historial</TabsTrigger>
          <TabsTrigger value="members">Miembros</TabsTrigger>
        </TabsList>

        <TabsContent value="active-requests" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Solicitudes de Financiamiento Activas</h3>
          
          {boardData.activeLoanRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {boardData.activeLoanRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.purpose}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-3 w-3 mr-1" />
                          <span>{request.startupName}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{request.amount} {request.currency}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Votos ({request.votes.yes + request.votes.no} de {request.votes.required} necesarios)
                      </div>
                      <Progress 
                        value={(request.votes.yes / request.votes.required) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{request.votes.yes} a favor</span>
                        <span>{request.votes.no} en contra</span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Plazo:</span> {request.term}
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Solicitado:</span> {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={`/loan-details/${request.id}`}>Ver Detalles</Link>
                    </Button>
                    
                    {role === "lender" && (
                      <div className="flex gap-2">
                        <Button 
                          variant={request.userVote === "yes" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(request.id, "yes")}
                          disabled={request.userVote === "yes"}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={request.userVote === "no" ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleVote(request.id, "no")}
                          disabled={request.userVote === "no"}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No hay solicitudes activas</h3>
              <p className="text-muted-foreground mb-4">Actualmente no hay solicitudes de financiamiento pendientes de evaluación.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past-requests" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Historial de Solicitudes</h3>
          
          {boardData.pastLoanRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {boardData.pastLoanRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{request.purpose}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-3 w-3 mr-1" />
                          <span>{request.startupName}</span>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={request.status === "approved" ? "default" : "destructive"}
                      >
                        {request.status === "approved" ? "Aprobada" : "Rechazada"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto Solicitado
                      </div>
                      <div className="text-lg font-bold">{request.amount} {request.currency}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Resultado de Votación
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
                          {request.votes.yes}
                        </span>
                        <span className="flex items-center">
                          <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
                          {request.votes.no}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Plazo:</span> {request.term}
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        {request.status === "approved" ? "Financiado:" : "Rechazado:"}
                      </span> 
                      {new Date(request.status === "approved" ? request.fundedAt : request.rejectedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/loan-details/${request.id}`}>Ver Detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No hay historial</h3>
              <p className="text-muted-foreground mb-4">Esta junta aún no ha procesado ninguna solicitud de financiamiento.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Miembros de la Junta</h3>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {boardData.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.role === "admin" ? "Administrador" : "Miembro"} · 
                          Se unió el {new Date(member.joinedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {role === "lender" && boardData.members[0].id !== member.id && (
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4 mr-1" /> Eliminar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}