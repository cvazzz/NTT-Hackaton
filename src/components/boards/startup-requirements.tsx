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
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, CheckCircle, AlertCircle, Clock, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const mockRequirements = [
  {
    id: 1,
    title: "Plan de Negocio",
    description: "Documento detallado que describe el modelo de negocio, análisis de mercado, estrategia y proyecciones financieras.",
    required: true,
    submitted: true,
    approved: true
  },
  {
    id: 2,
    title: "Pitch Deck",
    description: "Presentación visual que resume la propuesta de valor, el equipo, el mercado y las proyecciones financieras.",
    required: true,
    submitted: true,
    approved: false
  },
  {
    id: 3,
    title: "Estados Financieros",
    description: "Balance general, estado de resultados y flujo de caja de los últimos 6 meses.",
    required: true,
    submitted: false,
    approved: false
  },
  {
    id: 4,
    title: "Perfil del Equipo",
    description: "Información sobre los fundadores y miembros clave del equipo, incluyendo experiencia y habilidades.",
    required: true,
    submitted: true,
    approved: true
  },
  {
    id: 5,
    title: "Registro Legal",
    description: "Documentos de constitución legal de la startup y permisos relevantes.",
    required: true,
    submitted: false,
    approved: false
  }
];

const mockBoardVotes = [
  {
    id: 101,
    boardName: "Junta de Inversión en Tecnología",
    members: 5,
    votesReceived: 3,
    votesRequired: 4,
    status: "en progreso",
    deadline: "2025-06-15"
  },
  {
    id: 102,
    boardName: "Junta de Startups Sostenibles",
    members: 8,
    votesReceived: 6,
    votesRequired: 5,
    status: "aprobado",
    deadline: "2025-06-01"
  }
];

export function StartupRequirements() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("requirements");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<number | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadFile || selectedRequirement === null) return;

    // En una implementación real, esto enviaría el archivo al backend
    toast({
      title: "Documento subido",
      description: `${uploadFile.name} ha sido subido correctamente.`,
    });

    setUploadDialogOpen(false);
    setUploadFile(null);
    setSelectedRequirement(null);
  };

  const openUploadDialog = (requirementId: number) => {
    setSelectedRequirement(requirementId);
    setUploadDialogOpen(true);
  };

  const getRequirementStatus = (requirement: typeof mockRequirements[0]) => {
    if (requirement.approved) {
      return { label: "Aprobado", color: "bg-green-500", icon: <CheckCircle className="h-4 w-4 text-green-500" /> };
    } else if (requirement.submitted) {
      return { label: "En revisión", color: "bg-yellow-500", icon: <Clock className="h-4 w-4 text-yellow-500" /> };
    } else {
      return { label: "Pendiente", color: "bg-red-500", icon: <AlertCircle className="h-4 w-4 text-red-500" /> };
    }
  };

  const calculateCompletionPercentage = () => {
    const totalRequirements = mockRequirements.length;
    const submittedRequirements = mockRequirements.filter(req => req.submitted).length;
    return Math.round((submittedRequirements / totalRequirements) * 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Requisitos de Startup</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estado de tu Solicitud</CardTitle>
          <CardDescription>
            Completa todos los requisitos para que las juntas de inversión puedan evaluar tu startup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progreso de Documentación</span>
                <span className="text-sm font-medium">{calculateCompletionPercentage()}%</span>
              </div>
              <Progress value={calculateCompletionPercentage()} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Juntas Evaluando</p>
                <p className="text-lg font-bold">{mockBoardVotes.length}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aprobaciones</p>
                <p className="text-lg font-bold">
                  {mockBoardVotes.filter(board => board.status === "aprobado").length} / {mockBoardVotes.length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requirements">Requisitos</TabsTrigger>
          <TabsTrigger value="board-votes">Votos de Juntas</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-4">
          {mockRequirements.map((requirement) => {
            const status = getRequirementStatus(requirement);
            
            return (
              <Card key={requirement.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{requirement.title}</CardTitle>
                      <CardDescription>{requirement.description}</CardDescription>
                    </div>
                    <Badge 
                      className={`${status.color === 'bg-green-500' ? 'bg-green-500 hover:bg-green-500/80' : 
                                  status.color === 'bg-yellow-500' ? 'bg-yellow-500 hover:bg-yellow-500/80' : 
                                  'bg-red-500 hover:bg-red-500/80'} text-white`}
                    >
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter>
                  {!requirement.submitted ? (
                    <Button 
                      onClick={() => openUploadDialog(requirement.id)}
                      className="w-full"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Subir Documento
                    </Button>
                  ) : !requirement.approved ? (
                    <Button 
                      variant="outline" 
                      onClick={() => openUploadDialog(requirement.id)}
                      className="w-full"
                    >
                      <FileText className="mr-2 h-4 w-4" /> Actualizar Documento
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      disabled
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Documento Aprobado
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="board-votes" className="space-y-4">
          {mockBoardVotes.map((board) => (
            <Card key={board.id}>
              <CardHeader>
                <CardTitle className="text-lg">{board.boardName}</CardTitle>
                <CardDescription>
                  {board.votesReceived} de {board.members} miembros han votado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progreso de Votación</span>
                    <span className="text-sm font-medium">
                      {Math.round((board.votesReceived / board.votesRequired) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(board.votesReceived / board.votesRequired) * 100} 
                    className="h-2" 
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Fecha límite: {new Date(board.deadline).toLocaleDateString()}</span>
                  </div>
                  <Badge 
                    className={board.status === "aprobado" ? 
                      "bg-green-500 hover:bg-green-500/80" : 
                      "bg-yellow-500 hover:bg-yellow-500/80"}
                  >
                    {board.status === "aprobado" ? "Aprobado" : "En Progreso"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full"
                >
                  <Link to={`/boards/${board.id}`}>
                    <Users className="mr-2 h-4 w-4" /> Ver Junta
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subir Documento</DialogTitle>
            <DialogDescription>
              Sube el documento requerido en formato PDF, DOC o DOCX.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="document">Documento</Label>
              <Input id="document" type="file" onChange={handleFileChange} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirmo que este documento es preciso y verídico
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpload} disabled={!uploadFile}>Subir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}