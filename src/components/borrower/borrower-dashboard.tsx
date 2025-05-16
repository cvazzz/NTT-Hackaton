
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calendar, Clock, CreditCard, TrendingUp, FileText, Info, ClipboardCheck, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockActiveLoans = [
  {
    id: 1,
    purpose: "Business Expansion",
    amount: 1000,
    currency: "NEAR",
    totalPayments: 6,
    completedPayments: 2,
    nextPayment: "2025-06-01",
    status: "active"
  },
  {
    id: 2,
    purpose: "Education",
    amount: 500,
    currency: "NEAR",
    totalPayments: 4,
    completedPayments: 1,
    nextPayment: "2025-05-25",
    status: "active"
  }
];

const mockLoanRequests = [
  {
    id: 3,
    purpose: "Home Renovation",
    amount: 2000,
    currency: "NEAR",
    status: "pending",
    createdAt: "2025-05-10",
    votes: 3,
    requiredVotes: 5
  }
];

export function BorrowerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Bienvenido de nuevo</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/startup-requirements">
              <ClipboardCheck className="mr-2 h-4 w-4" /> Requisitos de Startup
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/investment-boards-explorer">
              <Users className="mr-2 h-4 w-4" /> Juntas de Inversión
            </Link>
          </Button>
          <Button asChild>
            <Link to="/request-loan">
              <FileText className="mr-2 h-4 w-4" /> Solicitar Financiamiento
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financiamientos Activos</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockActiveLoans.length}</div>
            <p className="text-xs text-muted-foreground">
              Total value: {mockActiveLoans.reduce((sum, loan) => sum + loan.amount, 0)} NEAR
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 25, 2025</div>
            <p className="text-xs text-muted-foreground">
              50 NEAR for Education Loan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLoanRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Esperando aprobación de juntas de inversión
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntuación de Startup</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Financiamientos Activos</TabsTrigger>
          <TabsTrigger value="requests">Solicitudes Pendientes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Financiamientos Activos</h3>

          {mockActiveLoans.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockActiveLoans.map((loan) => (
                <Card key={loan.id}>
                  <CardHeader>
                    <CardTitle>{loan.purpose}</CardTitle>
                    <CardDescription>
                      <span className="status-badge-active">Active</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Amount
                      </div>
                      <div className="text-2xl font-bold">{loan.amount} {loan.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Repayment Progress
                      </div>
                      <Progress value={(loan.completedPayments / loan.totalPayments) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{loan.completedPayments} of {loan.totalPayments} payments</span>
                        <span>{Math.round((loan.completedPayments / loan.totalPayments) * 100)}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Next Payment
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(loan.nextPayment).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-loans/${loan.id}`}>View Details</Link>
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
              <h3 className="text-lg font-medium">Sin Financiamientos Activos</h3>
              <p className="text-muted-foreground mb-4">Tu startup aún no tiene financiamientos activos. Completa los requisitos y solicita financiamiento para impulsar tu crecimiento.</p>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/startup-requirements">
                    <ClipboardCheck className="mr-2 h-4 w-4" /> Ver Requisitos
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/request-loan">Solicitar Financiamiento</Link>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <h3 className="text-lg font-medium mt-2">Solicitudes de Financiamiento</h3>
          
          {mockLoanRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockLoanRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <CardTitle>{request.purpose}</CardTitle>
                    <CardDescription>
                      <span className="status-badge-pending">Pending</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Amount Requested
                      </div>
                      <div className="text-2xl font-bold">{request.amount} {request.currency}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Approval Status
                      </div>
                      <Progress value={(request.votes / request.requiredVotes) * 100} className="h-2" />
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{request.votes} of {request.requiredVotes} votes</span>
                        <span>{Math.round((request.votes / request.requiredVotes) * 100)}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Request Date
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/request-status/${request.id}`}>View Status</Link>
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
              <h3 className="text-lg font-medium">No Loan Requests</h3>
              <p className="text-muted-foreground mb-4">You don't have any pending loan requests.</p>
              <Button asChild>
                <Link to="/request-loan">Create a Loan Request</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
