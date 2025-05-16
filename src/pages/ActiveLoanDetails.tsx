import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  PieChart, 
  User, 
  ChevronLeft,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/contexts/user-role-context";

const ActiveLoanDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { role } = useUserRole();
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [loanData, setLoanData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Simulación de carga de datos
  useEffect(() => {
    setIsLoading(true);
    // Simular una llamada a la API
    setTimeout(() => {
      // Mock data que simula un préstamo específico
      const mockLoanData = {
        id: parseInt(id || "1"),
        title: "Expansión de Negocio",
        amount: 1000,
        currency: "NEAR",
        term: 6,
        interestRate: 5.2,
        purpose: "Negocios",
        description: "Capital para expandir mi tienda local de productos orgánicos. Con este préstamo aumentaré el inventario y realizaré mejoras en el local para atender la creciente demanda.",
        status: "active",
        totalPayments: 6,
        completedPayments: 2,
        nextPayment: "2025-06-01",
        nextPaymentAmount: 175,
        lenders: 5,
        createdAt: "2025-04-01",
        startDate: "2025-04-15",
        endDate: "2025-10-15",
        paymentSchedule: [
          { id: 1, date: "2025-05-01", amount: 175, status: "completed", paidDate: "2025-04-28" },
          { id: 2, date: "2025-06-01", amount: 175, status: "pending" },
          { id: 3, date: "2025-07-01", amount: 175, status: "pending" },
          { id: 4, date: "2025-08-01", amount: 175, status: "pending" },
          { id: 5, date: "2025-09-01", amount: 175, status: "pending" },
          { id: 6, date: "2025-10-01", amount: 175, status: "pending" },
        ],
        comments: [
          { id: 1, user: "prestamista.near", text: "¿Cómo va la expansión del negocio?", date: "2025-05-05" },
          { id: 2, user: "prestatario.near", text: "¡Va muy bien! Ya hemos aumentado el inventario y estamos viendo un incremento en las ventas.", date: "2025-05-06" },
        ],
        lenderDetails: [
          { id: 101, name: "juan.near", amount: 300, date: "2025-04-02" },
          { id: 102, name: "maria.near", amount: 200, date: "2025-04-03" },
          { id: 103, name: "carlos.near", amount: 200, date: "2025-04-05" },
          { id: 104, name: "ana.near", amount: 150, date: "2025-04-10" },
          { id: 105, name: "pedro.near", amount: 150, date: "2025-04-12" },
        ],
        activities: [
          { id: 1, type: "payment", description: "Pago realizado", amount: 175, date: "2025-04-28" },
          { id: 2, type: "comment", description: "Nuevo comentario", user: "prestamista.near", date: "2025-05-05" },
          { id: 3, type: "comment", description: "Respuesta a comentario", user: "prestatario.near", date: "2025-05-06" },
        ]
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
      user: `${role}.near`,
      text: comment,
      date: new Date().toISOString().split('T')[0],
    };
    
    setLoanData({
      ...loanData,
      comments: [...loanData.comments, newComment],
      activities: [
        {
          id: loanData.activities.length + 1,
          type: "comment",
          description: "Nuevo comentario",
          user: `${role}.near`,
          date: new Date().toISOString().split('T')[0],
        },
        ...loanData.activities
      ]
    });
    
    setComment("");
  };

  const handleMakePayment = () => {
    // En una implementación real, esto procesaría el pago a través de la blockchain
    toast({
      title: "Pago realizado",
      description: "Tu pago ha sido procesado correctamente.",
    });

    // Actualizar localmente el estado del préstamo
    const updatedPaymentSchedule = loanData.paymentSchedule.map((payment: any, index: number) => {
      if (index === loanData.completedPayments) {
        return { ...payment, status: "completed", paidDate: new Date().toISOString().split('T')[0] };
      }
      return payment;
    });

    setLoanData({
      ...loanData,
      completedPayments: loanData.completedPayments + 1,
      paymentSchedule: updatedPaymentSchedule,
      activities: [
        {
          id: loanData.activities.length + 1,
          type: "payment",
          description: "Pago realizado",
          amount: loanData.nextPaymentAmount,
          date: new Date().toISOString().split('T')[0],
        },
        ...loanData.activities
      ],
      nextPayment: loanData.paymentSchedule[loanData.completedPayments + 1]?.date || null,
      nextPaymentAmount: loanData.paymentSchedule[loanData.completedPayments + 1]?.amount || 0,
    });

    setShowPaymentModal(false);
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
          <h2 className="text-xl font-medium">Financiamiento no encontrado</h2>
          <p className="text-muted-foreground mt-2">El financiamiento que buscas no existe o ha sido eliminado.</p>
          <Link to="/my-loans">
            <Button className="mt-4">Volver a Mis Financiamientos</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calcular el progreso del préstamo
  const progress = (loanData.completedPayments / loanData.totalPayments) * 100;

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="mb-6">
        <Link to="/my-loans" className="flex items-center text-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a Mis Financiamientos
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Información principal del préstamo */}
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{loanData.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Activo
                    </Badge>
                    <span className="text-muted-foreground">
                      Creado el {new Date(loanData.createdAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{loanData.amount} {loanData.currency}</div>
                  <div className="text-sm text-muted-foreground">
                    Tasa de interés: {loanData.interestRate}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Descripción</h3>
                <p className="text-muted-foreground">{loanData.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Progreso del Préstamo</h3>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-1 text-sm">
                  <span>{loanData.completedPayments} de {loanData.totalPayments} pagos</span>
                  <span>{Math.round(progress)}% completado</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Plazo
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{loanData.term} meses</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Fecha de Inicio
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(loanData.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Fecha de Finalización
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(loanData.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Prestamistas
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{loanData.lenders}</span>
                  </div>
                </div>
              </div>

              {role === "borrower" && (
                <div className="mt-6">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          <h4 className="font-medium">Próximo Pago</h4>
                          <div className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{new Date(loanData.nextPayment).toLocaleDateString()}</span>
                          </div>
                          <div className="text-2xl font-bold mt-1">
                            {loanData.nextPaymentAmount} {loanData.currency}
                          </div>
                        </div>
                        <Button onClick={() => setShowPaymentModal(true)}>
                          <CreditCard className="mr-2 h-4 w-4" /> Realizar Pago
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="schedule" className="w-full">
            <TabsList>
              <TabsTrigger value="schedule">Calendario de Pagos</TabsTrigger>
              <TabsTrigger value="lenders">Prestamistas</TabsTrigger>
              <TabsTrigger value="activity">Actividad</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendario de Pagos</CardTitle>
                  <CardDescription>
                    Historial y programación de pagos para este préstamo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanData.paymentSchedule.map((payment: any, index: number) => (
                      <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          {payment.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                          )}
                          <div>
                            <div className="font-medium">
                              Pago {index + 1} de {loanData.totalPayments}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Fecha: {new Date(payment.date).toLocaleDateString()}
                              {payment.paidDate && (
                                <span className="ml-2">
                                  (Pagado el {new Date(payment.paidDate).toLocaleDateString()})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {payment.amount} {loanData.currency}
                          </div>
                          <Badge className={payment.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {payment.status === "completed" ? "Completado" : "Pendiente"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lenders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prestamistas</CardTitle>
                  <CardDescription>
                    Personas que han invertido en este préstamo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanData.lenderDetails.map((lender: any) => (
                      <div key={lender.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{lender.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Invertido el {new Date(lender.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right font-medium">
                          {lender.amount} {loanData.currency}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>
                    Historial de actividades relacionadas con este préstamo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {loanData.activities.map((activity: any) => (
                      <div key={activity.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                          activity.type === "payment" ? "bg-green-100" : "bg-blue-100"
                        }`}>
                          {activity.type === "payment" ? (
                            <DollarSign className="h-5 w-5 text-green-600" />
                          ) : (
                            <MessageSquare className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-medium">{activity.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {typeof activity.date === "string" 
                                ? new Date(activity.date).toLocaleDateString() 
                                : activity.date.toLocaleDateString()}
                            </div>
                          </div>
                          {activity.type === "payment" && (
                            <div className="text-sm mt-1">
                              Monto: <span className="font-medium">{activity.amount} {loanData.currency}</span>
                            </div>
                          )}
                          {activity.type === "comment" && (
                            <div className="text-sm mt-1">
                              Usuario: <span className="font-medium">{activity.user}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Barra lateral */}
        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comentarios</CardTitle>
              <CardDescription>
                Discusión sobre este préstamo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loanData.comments.length > 0 ? (
                <div className="space-y-4">
                  {loanData.comments.map((comment: any) => (
                    <div key={comment.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{comment.user}</div>
                        <div className="text-xs text-muted-foreground">
                          {typeof comment.date === "string" 
                            ? new Date(comment.date).toLocaleDateString() 
                            : comment.date.toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">No hay comentarios aún.</p>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Textarea
                  placeholder="Escribe un comentario..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSubmitComment} className="w-full">
                  Enviar Comentario
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen del Préstamo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto del Préstamo:</span>
                <span className="font-medium">{loanData.amount} {loanData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tasa de Interés:</span>
                <span className="font-medium">{loanData.interestRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plazo:</span>
                <span className="font-medium">{loanData.term} meses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagos Completados:</span>
                <span className="font-medium">{loanData.completedPayments} de {loanData.totalPayments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Próximo Pago:</span>
                <span className="font-medium">{new Date(loanData.nextPayment).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto del Próximo Pago:</span>
                <span className="font-medium">{loanData.nextPaymentAmount} {loanData.currency}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Pago (simplificado) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Realizar Pago</h3>
            <p className="mb-4">Estás a punto de realizar un pago de <strong>{loanData.nextPaymentAmount} {loanData.currency}</strong> para tu préstamo.</p>
            
            <div className="bg-muted p-4 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <span>Monto del Pago:</span>
                <span className="font-bold">{loanData.nextPaymentAmount} {loanData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Fecha de Vencimiento:</span>
                <span>{new Date(loanData.nextPayment).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
                Cancelar
              </Button>
              <Button onClick={handleMakePayment}>
                Confirmar Pago
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveLoanDetails;