import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calendar, Clock, CreditCard, FileText, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserRole } from "@/contexts/user-role-context";

// Datos simulados para préstamos activos
const mockActiveLoans = [
  {
    id: 1,
    purpose: "Expansión de Negocio",
    amount: 1000,
    currency: "NEAR",
    totalPayments: 6,
    completedPayments: 2,
    nextPayment: "2025-06-01",
    status: "active",
    lenders: 5,
    interestRate: 5.2
  },
  {
    id: 2,
    purpose: "Desarrollo de Producto",
    amount: 500,
    currency: "NEAR",
    totalPayments: 4,
    completedPayments: 1,
    nextPayment: "2025-05-25",
    status: "active",
    lenders: 3,
    interestRate: 4.8
  }
];

// Datos simulados para préstamos completados
const mockCompletedLoans = [
  {
    id: 3,
    purpose: "Desarrollo de Startup de Tecnología",
    amount: 300,
    currency: "NEAR",
    totalPayments: 3,
    completedPayments: 3,
    completedDate: "2025-03-15",
    status: "completed",
    lenders: 2,
    interestRate: 4.5
  }
];

// Datos simulados para solicitudes pendientes
const mockPendingRequests = [
  {
    id: 4,
    purpose: "Financiamiento de Startup",
    amount: 2000,
    currency: "NEAR",
    status: "pending",
    createdAt: "2025-05-10",
    votes: 3,
    requiredVotes: 5,
    interestRate: 5.5
  }
];

const MyLoans = () => {
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState("active");

  // Si el usuario no es un prestatario, mostrar mensaje
  if (role !== "borrower") {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-medium">Acceso Restringido</h2>
          <p className="text-muted-foreground mt-2">Esta sección es solo para prestatarios.</p>
          <Link to="/dashboard">
            <Button className="mt-4">Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Mis Préstamos</h2>
        <Button asChild>
          <Link to="/request-loan">
            <FileText className="mr-2 h-4 w-4" /> Solicitar Nuevo Préstamo
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="active">Préstamos Activos</TabsTrigger>
          <TabsTrigger value="pending">Solicitudes Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Préstamos Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Préstamos Activos</h3>

          {mockActiveLoans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockActiveLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardHeader>
                    <CardTitle>{loan.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto
                      </div>
                      <div className="text-2xl font-bold">{loan.amount} {loan.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Progreso de Pago
                      </div>
                      <Progress value={(loan.completedPayments / loan.totalPayments) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{loan.completedPayments} de {loan.totalPayments} pagos</span>
                        <span>{Math.round((loan.completedPayments / loan.totalPayments) * 100)}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Próximo Pago
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(loan.nextPayment).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Prestamistas
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{loan.lenders} prestamistas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-loans/${loan.id}`}>Ver Detalles</Link>
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
              <h3 className="text-lg font-medium">No tienes préstamos activos</h3>
              <p className="text-muted-foreground mb-4">Solicita un préstamo para comenzar.</p>
              <Button asChild>
                <Link to="/request-loan">Solicitar un Préstamo</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Solicitudes Pendientes</h3>
          
          {mockPendingRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockPendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle>{request.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pendiente
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto Solicitado
                      </div>
                      <div className="text-2xl font-bold">{request.amount} {request.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Estado de Aprobación
                      </div>
                      <Progress value={(request.votes / request.requiredVotes) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{request.votes} de {request.requiredVotes} votos</span>
                        <span>{Math.round((request.votes / request.requiredVotes) * 100)}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Fecha de Solicitud
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tasa de Interés
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{request.interestRate}%</span>
                        </div>
                      </div>
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
                <Info className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No tienes solicitudes pendientes</h3>
              <p className="text-muted-foreground mb-4">Crea una nueva solicitud de préstamo.</p>
              <Button asChild>
                <Link to="/request-loan">Solicitar un Préstamo</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Préstamos Completados</h3>
          
          {mockCompletedLoans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockCompletedLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardHeader>
                    <CardTitle>{loan.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Completado
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto
                      </div>
                      <div className="text-2xl font-bold">{loan.amount} {loan.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Progreso de Pago
                      </div>
                      <Progress value={100} className="h-2 bg-green-100" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{loan.completedPayments} de {loan.totalPayments} pagos</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Fecha de Finalización
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(loan.completedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Prestamistas
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{loan.lenders} prestamistas</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-loans/${loan.id}`}>Ver Historial</Link>
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
              <h3 className="text-lg font-medium">No tienes préstamos completados</h3>
              <p className="text-muted-foreground mb-4">Tu historial de préstamos completados aparecerá aquí.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyLoans;