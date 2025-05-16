
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  PieChart, 
  User, 
  Users,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { LoanInvestment } from "@/components/loan-investment";
import { LoanActivity } from "@/components/loan-activity";
import { LoanRepaymentChart } from "@/components/loan-repayment-chart";
import { useUserRole } from "@/contexts/user-role-context";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const LoanDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { role, isWalletConnected } = useUserRole();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [loanData, setLoanData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulación de carga de datos
  useEffect(() => {
    setIsLoading(true);
    // Simular una llamada a la API
    setTimeout(() => {
      // Definir descripciones específicas para cada tipo de préstamo
      const loanDescriptions = {
        "Expansión de negocio": "Necesito capital para expandir mi tienda local de productos orgánicos. Con este préstamo podré aumentar el inventario y realizar mejoras en el local para atender la creciente demanda.",
        "Desarrollo de Producto": "Busco financiamiento para completar el desarrollo de nuestro producto innovador. Los fondos se utilizarán para finalizar el prototipo, realizar pruebas con usuarios y preparar el lanzamiento al mercado.",
        "Financiamiento de Startup": "Nuestra startup necesita capital inicial para establecer operaciones. El préstamo cubrirá gastos de constitución, equipamiento básico, y capital operativo para los primeros 6 meses de funcionamiento.",
        "Desarrollo de Startup de Tecnología": "Somos una startup tecnológica que necesita recursos para desarrollar nuestra plataforma digital. El financiamiento se destinará a contratación de desarrolladores, infraestructura en la nube y marketing inicial."
      };
      
      // Determinar el propósito del préstamo basado en el ID
      let loanPurpose = "Expansión de negocio";
      if (id === "2") loanPurpose = "Desarrollo de Producto";
      if (id === "3") loanPurpose = "Financiamiento de Startup";
      if (id === "4") loanPurpose = "Desarrollo de Startup de Tecnología";
      
      // Mock data que simula un préstamo específico
      const mockLoanData = {
        id: parseInt(id || "1"),
        title: loanPurpose,
        borrower: "maria.near",
        amount: 1000,
        currency: "NEAR",
        term: 12,
        interestRate: 5.5,
        purpose: loanPurpose,
        description: loanDescriptions[loanPurpose as keyof typeof loanDescriptions],
        status: "active",
        funded: 650,
        progress: 65,
        backers: 8,
        risk: "Bajo",
        createdAt: "2025-04-30",
        endDate: "2025-05-30",
        paymentSchedule: [
          { date: "2025-06-30", amount: 87.5, status: "pending" },
          { date: "2025-07-30", amount: 87.5, status: "pending" },
          { date: "2025-08-30", amount: 87.5, status: "pending" },
          { date: "2025-09-30", amount: 87.5, status: "pending" },
          { date: "2025-10-30", amount: 87.5, status: "pending" },
          { date: "2025-11-30", amount: 87.5, status: "pending" },
          { date: "2025-12-30", amount: 87.5, status: "pending" },
          { date: "2026-01-30", amount: 87.5, status: "pending" },
          { date: "2026-02-28", amount: 87.5, status: "pending" },
          { date: "2026-03-30", amount: 87.5, status: "pending" },
          { date: "2026-04-30", amount: 87.5, status: "pending" },
          { date: "2026-05-30", amount: 87.5, status: "pending" },
        ],
        comments: [
          { id: 1, user: "juan.near", text: "¿Podrías compartir más detalles sobre tu plan de negocio?", date: "2025-05-02" },
          { id: 2, user: "maria.near", text: "¡Claro! El plan incluye ampliar el área de productos frescos y añadir una sección de alimentos preparados.", date: "2025-05-03" },
          { id: 3, user: "ana.near", text: "¿Cuánto tiempo lleva operando tu negocio?", date: "2025-05-04" },
        ],
        documents: [
          { name: "Plan de Negocio", type: "pdf", size: "1.2 MB" },
          { name: "Estados Financieros", type: "pdf", size: "0.8 MB" },
          { name: "Licencia Comercial", type: "jpg", size: "0.5 MB" },
        ],
        activities: [
          { id: 1, user: "carlos.near", action: "ha invertido", amount: 100, currency: "NEAR", date: "hace 2 horas" },
          { id: 2, user: "laura.near", action: "ha invertido", amount: 50, currency: "NEAR", date: "hace 5 horas" },
          { id: 3, user: "pablo.near", action: "ha hecho una pregunta", date: "hace 1 día" },
          { id: 4, user: "maria.near", action: "ha actualizado su solicitud", date: "hace 2 días" },
        ],
        repaymentChart: [
          { month: "Jun", capital: 70, interest: 17.5 },
          { month: "Jul", capital: 71, interest: 16.5 },
          { month: "Ago", capital: 72, interest: 15.5 },
          { month: "Sep", capital: 73, interest: 14.5 },
          { month: "Oct", capital: 74, interest: 13.5 },
          { month: "Nov", capital: 75, interest: 12.5 },
          { month: "Dic", capital: 76, interest: 11.5 },
          { month: "Ene", capital: 77, interest: 10.5 },
          { month: "Feb", capital: 78, interest: 9.5 },
          { month: "Mar", capital: 79, interest: 8.5 },
          { month: "Abr", capital: 80, interest: 7.5 },
          { month: "May", capital: 81, interest: 6.5 },
        ],
      };
      
      setLoanData(mockLoanData);
      setIsLoading(false);
    }, 200);
  }, [id]);

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    // En una implementación real, esto enviaría el comentario al backend
    toast({
      title: "Comentario enviado",
      description: "Tu comentario ha sido publicado.",
    });
    
    // Actualizar localmente los comentarios
    const newComment = {
      id: loanData.comments.length + 1,
      user: `${role === "borrower" ? "prestatario" : "inversor"}.near`,
      text: comment,
      date: "ahora mismo",
    };
    
    setLoanData({
      ...loanData,
      comments: [...loanData.comments, newComment],
    });
    
    setComment("");
  };

  const handleInvestmentSuccess = (amount: number) => {
    // Actualizar localmente el estado del préstamo
    const newFunded = loanData.funded + amount;
    const newProgress = Math.min(Math.round((newFunded / loanData.amount) * 100), 100);
    
    setLoanData({
      ...loanData,
      funded: newFunded,
      progress: newProgress,
      backers: loanData.backers + 1,
      activities: [
        {
          id: loanData.activities.length + 1,
          user: "tú",
          action: "has invertido",
          amount,
          currency: loanData.currency,
          date: "justo ahora",
        },
        ...loanData.activities,
      ],
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-2/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-medium">Solicitud no encontrada</h2>
          <p className="text-muted-foreground mt-2">La solicitud de financiamiento que buscas no existe o ha sido eliminada.</p>
          <Link to={role === "borrower" ? "/my-loans" : "/explore-requests"}>
            <Button className="mt-4">{role === "borrower" ? "Volver a mis préstamos" : "Volver a explorar startups"}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const riskColors: Record<string, string> = {
    "Bajo": "bg-green-500",
    "Medio": "bg-yellow-500",
    "Alto": "bg-red-500"
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link to={role === "borrower" ? "/my-loans" : "/explore-requests"} className="flex items-center text-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          {role === "borrower" ? "Volver a mis préstamos" : "Volver a explorar startups"}
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Columna principal */}
        <div className="flex-1 space-y-6">
          {/* Encabezado del préstamo */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge>{loanData.purpose}</Badge>
                <Badge variant={loanData.status === "active" ? "outline" : "secondary"}>
                  {loanData.status === "active" ? "Recaudando fondos" : "Finalizado"}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{loanData.title}</CardTitle>
              <CardDescription>
                Solicitado por <span className="font-medium">{loanData.borrower}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{loanData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pestañas de información detallada */}
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="schedule">Calendario</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="discussion">Discusión</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Préstamo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Monto Solicitado</h4>
                        <p className="text-2xl font-semibold">{loanData.amount} {loanData.currency}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Plazo</h4>
                        <p>{loanData.term} meses</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Tasa de Interés</h4>
                        <p>{loanData.interestRate}% anual</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Nivel de Riesgo</h4>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${riskColors[loanData.risk]}`}></span>
                          <p>{loanData.risk}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de Creación</h4>
                        <p>{loanData.createdAt}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de Cierre</h4>
                        <p>{loanData.endDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <LoanRepaymentChart 
                data={loanData.repaymentChart}
                currency={loanData.currency}
              />
            </TabsContent>
            
            <TabsContent value="schedule" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendario de Pagos</CardTitle>
                  <CardDescription>Programa de devolución del préstamo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanData.paymentSchedule.map((payment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2 last:border-none">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{payment.date}</span>
                        </div>
                        <div>
                          <span className="font-medium">{payment.amount} {loanData.currency}</span>
                        </div>
                        <div>
                          <Badge variant={payment.status === "paid" ? "outline" : "secondary"}>
                            {payment.status === "paid" ? "Pagado" : "Pendiente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Documentación</CardTitle>
                  <CardDescription>Archivos proporcionados por el solicitante</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanData.documents.map((doc: any, index: number) => (
                      <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{doc.size}</span>
                          <Button variant="outline" size="sm">
                            Ver
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Discusión</CardTitle>
                  <CardDescription>Preguntas y respuestas sobre esta solicitud</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {loanData.comments.map((comment: any) => (
                      <div key={comment.id} className="border-b pb-4 last:border-none">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                            </Avatar>
                            <span className="font-medium">{comment.user}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  {isWalletConnected && (
                    <div className="mt-6">
                      <Textarea
                        placeholder="Escribe un comentario o pregunta..."
                        className="mb-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button onClick={handleSubmitComment}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Enviar Comentario
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Barra lateral */}
        <div className="w-full md:w-80 space-y-6">
          {/* Estado de la financiación */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de la Financiación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Progreso</span>
                  <span className="font-medium">{loanData.progress}%</span>
                </div>
                <Progress value={loanData.progress} className="mt-2 h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Recaudado</span>
                  <span>{loanData.funded} {loanData.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Objetivo</span>
                  <span>{loanData.amount} {loanData.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prestamistas</span>
                  <span>{loanData.backers}</span>
                </div>
              </div>
              
              <Separator />
              
              {role === "lender" && loanData.progress < 100 ? (
                <LoanInvestment
                  loanAmount={loanData.amount}
                  fundedAmount={loanData.funded}
                  currency={loanData.currency}
                  onInvestmentSuccess={handleInvestmentSuccess}
                />
              ) : (
                <div className="p-4 bg-muted/50 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">
                    {isWalletConnected 
                      ? role === "borrower" 
                        ? "Cambia a modo prestamista para invertir" 
                        : "Este préstamo está completamente financiado" 
                      : "Conecta tu wallet para invertir"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Información del solicitante */}
          <Card>
            <CardHeader>
              <CardTitle>Solicitante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">{loanData.borrower}</p>
                  <p className="text-sm text-muted-foreground">Miembro desde 2024</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">Préstamos</p>
                  <p className="font-medium">2</p>
                </div>
                <div className="p-2 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">Reputación</p>
                  <p className="font-medium">98%</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Ver Perfil
              </Button>
            </CardContent>
          </Card>
          
          {/* Actividad reciente */}
          <LoanActivity activities={loanData.activities} />
          
          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <PieChart className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm">Probabilidad de repago</p>
                  <p className="font-medium">95%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm">Préstamos similares financiados</p>
                  <p className="font-medium">15 de 18</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm">Tasa de morosidad en categoría</p>
                  <p className="font-medium">2.3%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
