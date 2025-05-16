import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Users, User, TrendingUp, Calendar, Info, Plus, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Datos simulados para comunidades
const mockCommunities = [
  {
    id: 1,
    name: "Emprendedores Locales",
    description: "Apoyando a pequeños negocios en la comunidad NEAR",
    members: 24,
    activeLoans: 8,
    totalFunded: 12000,
    currency: "NEAR",
    avgReturn: 5.8,
    memberSince: "2025-01-15",
    isJoined: true,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Educación Sin Fronteras",
    description: "Financiando el futuro a través de la educación",
    members: 42,
    activeLoans: 15,
    totalFunded: 25000,
    currency: "NEAR",
    avgReturn: 4.9,
    memberSince: null,
    isJoined: false,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Tecnología Sostenible",
    description: "Apoyando proyectos tecnológicos con impacto ambiental positivo",
    members: 18,
    activeLoans: 6,
    totalFunded: 9000,
    currency: "NEAR",
    avgReturn: 6.2,
    memberSince: null,
    isJoined: false,
    avatar: "/placeholder.svg"
  }
];

// Datos simulados para préstamos activos en la comunidad seleccionada
const mockCommunityLoans = [
  {
    id: 101,
    borrower: "maria.near",
    purpose: "Expansión de Tienda Local",
    amount: 1500,
    currency: "NEAR",
    funded: 1200,
    progress: 80,
    term: "12 meses",
    returnRate: 5.5,
    risk: "bajo"
  },
  {
    id: 102,
    borrower: "carlos.near",
    purpose: "Equipamiento para Startup",
    amount: 2000,
    currency: "NEAR",
    funded: 1000,
    progress: 50,
    term: "18 meses",
    returnRate: 6.0,
    risk: "medio"
  },
  {
    id: 103,
    borrower: "ana.near",
    purpose: "Proyecto de Energía Solar",
    amount: 3000,
    currency: "NEAR",
    funded: 2700,
    progress: 90,
    term: "24 meses",
    returnRate: 5.8,
    risk: "bajo"
  }
];

// Datos simulados para miembros de la comunidad seleccionada
const mockCommunityMembers = [
  {
    id: 201,
    name: "juan.near",
    role: "Fundador",
    joinedDate: "2025-01-01",
    totalInvested: 5000,
    loansSupported: 12,
    avatar: "/placeholder.svg"
  },
  {
    id: 202,
    name: "laura.near",
    role: "Moderador",
    joinedDate: "2025-01-05",
    totalInvested: 3500,
    loansSupported: 8,
    avatar: "/placeholder.svg"
  },
  {
    id: 203,
    name: "pablo.near",
    role: "Miembro",
    joinedDate: "2025-02-10",
    totalInvested: 2000,
    loansSupported: 5,
    avatar: "/placeholder.svg"
  },
  {
    id: 204,
    name: "sofia.near",
    role: "Miembro",
    joinedDate: "2025-03-15",
    totalInvested: 1500,
    loansSupported: 4,
    avatar: "/placeholder.svg"
  }
];

const Communities = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("loans");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar comunidades por término de búsqueda
  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener la comunidad seleccionada
  const selectedCommunityData = selectedCommunity
    ? mockCommunities.find(c => c.id === selectedCommunity)
    : null;

  // Manejar la selección de una comunidad
  const handleSelectCommunity = (id: number) => {
    setSelectedCommunity(id);
    setActiveTab("loans");
  };

  // Manejar el regreso a la lista de comunidades
  const handleBackToList = () => {
    setSelectedCommunity(null);
  };

  // Manejar la unión a una comunidad
  const handleJoinCommunity = () => {
    // En una implementación real, esto enviaría una solicitud al backend
    // Por ahora, solo actualizamos el estado local
    const updatedCommunities = mockCommunities.map(community =>
      community.id === selectedCommunity
        ? { ...community, isJoined: true, memberSince: new Date().toISOString().split('T')[0] }
        : community
    );
    // En un caso real, actualizaríamos el estado global o haríamos una llamada a la API
    // Por ahora, solo simulamos el cambio
    console.log("Comunidades actualizadas:", updatedCommunities);
  };

  // Renderizar la vista de detalle de la comunidad
  if (selectedCommunity) {
    return (
      <div className="container mx-auto py-6 space-y-6 animate-fade-in">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBackToList} className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Comunidades
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Información de la comunidad */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedCommunityData?.avatar} alt={selectedCommunityData?.name} />
                    <AvatarFallback>{selectedCommunityData?.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedCommunityData?.name}</CardTitle>
                    <CardDescription>{selectedCommunityData?.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Miembros
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{selectedCommunityData?.members}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Préstamos Activos
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{selectedCommunityData?.activeLoans}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Total Financiado
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{selectedCommunityData?.totalFunded} {selectedCommunityData?.currency}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Retorno Promedio
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{selectedCommunityData?.avgReturn}%</span>
                    </div>
                  </div>
                </div>
                {selectedCommunityData?.isJoined ? (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Miembro desde
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(selectedCommunityData.memberSince!).toLocaleDateString()}</span>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleJoinCommunity}>
                    Unirse a la Comunidad
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList>
                <TabsTrigger value="loans">Préstamos</TabsTrigger>
                <TabsTrigger value="members">Miembros</TabsTrigger>
              </TabsList>

              <TabsContent value="loans" className="space-y-4">
                <h3 className="text-lg font-medium mt-2">Préstamos de la Comunidad</h3>
                
                {mockCommunityLoans.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockCommunityLoans.map((loan) => (
                      <Card key={loan.id}>
                        <CardHeader>
                          <CardTitle>{loan.purpose}</CardTitle>
                          <CardDescription>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {loan.risk === "bajo" ? "Riesgo Bajo" : loan.risk === "medio" ? "Riesgo Medio" : "Riesgo Alto"}
                            </span>
                            <span className="ml-2">{loan.borrower}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              Monto Solicitado
                            </div>
                            <div className="text-2xl font-bold">{loan.amount} {loan.currency}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              Progreso de Financiación
                            </div>
                            <Progress value={loan.progress} className="h-2" />
                            <div className="flex justify-between mt-1 text-sm">
                              <span>{loan.funded} de {loan.amount} {loan.currency}</span>
                              <span>{loan.progress}%</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                Plazo
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{loan.term}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-muted-foreground mb-1">
                                Tasa de Retorno
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-4 w-4" />
                                <span>{loan.returnRate}%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" asChild className="w-full">
                            <Link to={`/loan-details/${loan.id}`}>Ver Detalles</Link>
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
                    <h3 className="text-lg font-medium">No hay préstamos activos</h3>
                    <p className="text-muted-foreground mb-4">Esta comunidad no tiene préstamos activos en este momento.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <h3 className="text-lg font-medium mt-2">Miembros de la Comunidad</h3>
                
                {mockCommunityMembers.length > 0 ? (
                  <div className="space-y-4">
                    {mockCommunityMembers.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-medium">{member.name}</h4>
                                  <Badge variant="outline">{member.role}</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Miembro desde {new Date(member.joinedDate).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Total invertido:</span>{" "}
                                  <span className="font-medium">{member.totalInvested} NEAR</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-muted-foreground">Préstamos apoyados:</span>{" "}
                                  <span className="font-medium">{member.loansSupported}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No hay miembros</h3>
                    <p className="text-muted-foreground mb-4">Esta comunidad no tiene miembros en este momento.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // Renderizar la lista de comunidades
  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Comunidades</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Crear Comunidad
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar comunidades..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCommunities.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="overflow-hidden">
              <div className="h-2 w-full bg-primary" />
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={community.avatar} alt={community.name} />
                    <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{community.name}</CardTitle>
                    <CardDescription>{community.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Miembros
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{community.members}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Préstamos Activos
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{community.activeLoans}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Total Financiado
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>{community.totalFunded} {community.currency}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Retorno Promedio
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{community.avgReturn}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {community.isJoined ? (
                  <Button variant="outline" className="w-full" onClick={() => handleSelectCommunity(community.id)}>
                    Ver Comunidad
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => handleSelectCommunity(community.id)}>
                    Explorar Comunidad
                  </Button>
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
          <h3 className="text-lg font-medium">No se encontraron comunidades</h3>
          <p className="text-muted-foreground mb-4">Intenta con otra búsqueda o crea una nueva comunidad.</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Crear Comunidad
          </Button>
        </div>
      )}
    </div>
  );
};

export default Communities;