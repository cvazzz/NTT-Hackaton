
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { BarChart2, Coins, Search, Users, Info, TrendingUp, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockNewRequests = [
  {
    id: 1,
    borrower: "alice.near",
    purpose: "Business Expansion",
    amount: 1000,
    currency: "NEAR",
    term: "6 months",
    risk: "low",
    matchScore: 95,
  },
  {
    id: 2,
    borrower: "bob.near",
    purpose: "Education",
    amount: 500,
    currency: "NEAR",
    term: "4 months",
    risk: "medium",
    matchScore: 82,
  },
  {
    id: 3,
    borrower: "carol.near",
    purpose: "Home Renovation",
    amount: 2000,
    currency: "NEAR",
    term: "12 months",
    risk: "high",
    matchScore: 68,
  },
];

const mockActiveInvestments = [
  {
    id: 101,
    borrower: "david.near",
    purpose: "Small Business",
    amount: 800,
    currency: "NEAR",
    progress: 50,
    returnRate: 5.2,
    nextPayment: "2025-06-15",
  },
  {
    id: 102,
    borrower: "eve.near",
    purpose: "Medical Expenses",
    amount: 600,
    currency: "NEAR",
    progress: 75,
    returnRate: 4.8,
    nextPayment: "2025-05-30",
  },
];

export function LenderDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Panel de Inversor</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/boards">
              <Users className="mr-2 h-4 w-4" /> Juntas de Inversión
            </Link>
          </Button>
          <Button asChild>
            <Link to="/explore-requests">
              <Search className="mr-2 h-4 w-4" /> Explorar Startups
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,400 NEAR</div>
            <p className="text-xs text-muted-foreground">
              En {mockActiveInvestments.length} startups financiadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retorno Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.0%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevas Startups</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNewRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Coinciden con tus preferencias de inversión
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Juntas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Juntas de inversión activas
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList>
          <TabsTrigger value="opportunities">Oportunidades de Inversión</TabsTrigger>
          <TabsTrigger value="investments">Inversiones Activas</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium mt-2">Startups Recomendadas</h3>
            <Button variant="outline" size="sm" asChild>
              <Link to="/explore-requests">View All</Link>
            </Button>
          </div>

          {mockNewRequests.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockNewRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <div 
                    className={`h-1 w-full bg-gradient-to-r ${
                      request.risk === "low" 
                        ? "from-green-400 to-green-600" 
                        : request.risk === "medium" 
                        ? "from-yellow-400 to-yellow-600" 
                        : "from-red-400 to-red-600"
                    }`}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{request.purpose}</CardTitle>
                      <Badge className="ml-2" variant="secondary">{request.matchScore}% match</Badge>
                    </div>
                    <CardDescription className="flex justify-between">
                      <span>{request.borrower}</span>
                      <span className={`risk-indicator-${request.risk}`}>{request.risk} risk</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">{request.amount} {request.currency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Term:</span>
                        <span className="font-medium">{request.term}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" asChild className="w-full">
                      <Link to={`/loan-details/${request.id}`}>View Details</Link>
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
              <h3 className="text-lg font-medium">No Hay Startups Disponibles</h3>
              <p className="text-muted-foreground mb-4">
                No hay startups que coincidan con tus preferencias en este momento.
              </p>
              <Button asChild>
                <Link to="/settings">Adjust Preferences</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium mt-2">Your Active Investments</h3>
            <Button variant="outline" size="sm" asChild>
              <Link to="/my-investments">Manage All</Link>
            </Button>
          </div>

          {mockActiveInvestments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {mockActiveInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <CardTitle>{investment.purpose}</CardTitle>
                    <CardDescription>{investment.borrower}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">
                          Invested Amount
                        </div>
                        <div className="text-xl font-bold">
                          {investment.amount} {investment.currency}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted-foreground">
                          Return Rate
                        </div>
                        <div className="text-xl font-bold text-success">
                          {investment.returnRate}%
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Repayment Progress</span>
                        <span>{investment.progress}%</span>
                      </div>
                      <Progress value={investment.progress} className="h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        Next Payment
                      </div>
                      <div className="text-sm">
                        {new Date(investment.nextPayment).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-investments/${investment.id}`}>View Details</Link>
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
              <h3 className="text-lg font-medium">No Active Investments</h3>
              <p className="text-muted-foreground mb-4">
                You haven't invested in any loans yet.
              </p>
              <Button asChild>
                <Link to="/explore-requests">Find Opportunities</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
