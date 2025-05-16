import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calendar, Clock, Coins, TrendingUp, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserRole } from "@/contexts/user-role-context";

// Datos simulados para inversiones activas
const mockActiveInvestments = [
  {
    id: 1,
    borrower: "maria.near",
    purpose: "Expansión de Negocio",
    amount: 200,
    currency: "NEAR",
    totalPayments: 6,
    completedPayments: 2,
    nextPayment: "2025-06-01",
    status: "active",
    returnRate: 5.2,
    expectedReturn: 10.4
  },
  {
    id: 2,
    borrower: "carlos.near",
    purpose: "Educación",
    amount: 150,
    currency: "NEAR",
    totalPayments: 4,
    completedPayments: 1,
    nextPayment: "2025-05-25",
    status: "active",
    returnRate: 4.8,
    expectedReturn: 7.2
  }
];

// Datos simulados para inversiones completadas
const mockCompletedInvestments = [
  {
    id: 3,
    borrower: "pablo.near",
    purpose: "Financiamiento de Startup",
    amount: 100,
    currency: "NEAR",
    totalPayments: 3,
    completedPayments: 3,
    completedDate: "2025-03-15",
    status: "completed",
    returnRate: 4.5,
    totalReturn: 4.5
  }
];

// Datos simulados para oportunidades recomendadas
const mockRecommendedOpportunities = [
  {
    id: 4,
    borrower: "ana.near",
    purpose: "Renovación del Hogar",
    amount: 2000,
    amountNeeded: 800,
    currency: "NEAR",
    term: "12 meses",
    returnRate: 5.5,
    risk: "bajo",
    matchScore: 92
  },
  {
    id: 5,
    borrower: "juan.near",
    purpose: "Emprendimiento Tecnológico",
    amount: 3000,
    amountNeeded: 1200,
    currency: "NEAR",
    term: "24 meses",
    returnRate: 6.2,
    risk: "medio",
    matchScore: 85
  }
];

const MyInvestments = () => {
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState("active");

  // Si el usuario no es un prestamista, mostrar mensaje
  if (role !== "lender") {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-medium">Acceso Restringido</h2>
          <p className="text-muted-foreground mt-2">Esta sección es solo para prestamistas.</p>
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
        <h2 className="text-3xl font-bold">Mis Inversiones</h2>
        <Button asChild>
          <Link to="/explore-requests">
            <Coins className="mr-2 h-4 w-4" /> Explorar Oportunidades
          </Link>
        </Button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockActiveInvestments.reduce((sum, inv) => sum + inv.amount, 0)} NEAR
            </div>
            <p className="text-xs text-muted-foreground">
              En {mockActiveInvestments.length} préstamos activos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retorno Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockActiveInvestments.length > 0
                ? (mockActiveInvestments.reduce((sum, inv) => sum + inv.returnRate, 0) / mockActiveInvestments.length).toFixed(1)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              +0.3% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockActiveInvestments.length > 0
                ? new Date(mockActiveInvestments.sort((a, b) => 
                    new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime())[0].nextPayment
                  ).toLocaleDateString()
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockActiveInvestments.length > 0
                ? `${mockActiveInvestments[0].amount / mockActiveInvestments[0].totalPayments} NEAR de ${mockActiveInvestments[0].borrower}`
                : "Sin pagos programados"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Oportunidades</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRecommendedOpportunities.length}</div>
            <p className="text-xs text-muted-foreground">
              Coinciden con tus preferencias
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="active">Inversiones Activas</TabsTrigger>
          <TabsTrigger value="completed">Inversiones Completadas</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades Recomendadas</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Inversiones Activas</h3>

          {mockActiveInvestments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockActiveInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <CardTitle>{investment.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                      </span>
                      <span className="ml-2">{investment.borrower}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto Invertido
                      </div>
                      <div className="text-2xl font-bold">{investment.amount} {investment.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Progreso del Préstamo
                      </div>
                      <Progress value={(investment.completedPayments / investment.totalPayments) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{investment.completedPayments} de {investment.totalPayments} pagos</span>
                        <span>{Math.round((investment.completedPayments / investment.totalPayments) * 100)}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Próximo Pago
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(investment.nextPayment).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tasa de Retorno
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{investment.returnRate}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/loan-details/${investment.id}`}>Ver Detalles</Link>
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
              <h3 className="text-lg font-medium">No tienes inversiones activas</h3>
              <p className="text-muted-foreground mb-4">Explora oportunidades de préstamo para comenzar.</p>
              <Button asChild>
                <Link to="/explore-requests">Explorar Oportunidades</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Inversiones Completadas</h3>
          
          {mockCompletedInvestments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockCompletedInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <CardTitle>{investment.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Completado
                      </span>
                      <span className="ml-2">{investment.borrower}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto Invertido
                      </div>
                      <div className="text-2xl font-bold">{investment.amount} {investment.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Progreso del Préstamo
                      </div>
                      <Progress value={100} className="h-2 bg-green-100" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{investment.completedPayments} de {investment.totalPayments} pagos</span>
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
                          <span>{new Date(investment.completedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Retorno Total
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{investment.totalReturn} {investment.currency}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/loan-details/${investment.id}`}>Ver Historial</Link>
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
              <h3 className="text-lg font-medium">No tienes inversiones completadas</h3>
              <p className="text-muted-foreground mb-4">Tu historial de inversiones completadas aparecerá aquí.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Oportunidades Recomendadas</h3>
          
          {mockRecommendedOpportunities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockRecommendedOpportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <CardTitle>{opportunity.purpose}</CardTitle>
                    <CardDescription>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {opportunity.matchScore}% coincidencia
                      </span>
                      <span className="ml-2">{opportunity.borrower}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Monto Solicitado
                      </div>
                      <div className="text-2xl font-bold">{opportunity.amount} {opportunity.currency}</div>
                      <div className="text-sm text-muted-foreground">
                        Falta: {opportunity.amountNeeded} {opportunity.currency}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Plazo
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{opportunity.term}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">
                          Tasa de Retorno
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{opportunity.returnRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Nivel de Riesgo
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${opportunity.risk === "bajo" ? "bg-green-100 text-green-800" : opportunity.risk === "medio" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                          {opportunity.risk.charAt(0).toUpperCase() + opportunity.risk.slice(1)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" asChild className="w-full">
                      <Link to={`/loan-details/${opportunity.id}`}>Ver Detalles</Link>
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
              <h3 className="text-lg font-medium">No hay oportunidades recomendadas</h3>
              <p className="text-muted-foreground mb-4">Ajusta tus preferencias para ver más oportunidades.</p>
              <Button asChild>
                <Link to="/settings">Ajustar Preferencias</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyInvestments;