
import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronDown, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  User 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const mockLoanRequests = [
  {
    id: 1,
    borrower: "alice.near",
    borrowerScore: 92,
    purpose: "Expansión de Startup",
    category: "tech",
    amount: 1000,
    currency: "NEAR",
    term: 6,
    interestRate: 5.5,
    paymentFrequency: "mensual",
    risk: "bajo",
    storyExcerpt: "Estoy expandiendo mi startup de software B2B. El financiamiento me ayudará a contratar más desarrolladores y escalar nuestra infraestructura.",
    matchScore: 95,
    percentageFunded: 60,
    createdAt: "2025-05-10",
  },
  {
    id: 2,
    borrower: "bob.near",
    borrowerScore: 78,
    purpose: "Startup EdTech",
    category: "education",
    amount: 500,
    currency: "NEAR",
    term: 4,
    interestRate: 4.2,
    paymentFrequency: "mensual",
    risk: "medio",
    storyExcerpt: "Mi startup está desarrollando una plataforma educativa basada en blockchain. Este financiamiento nos permitirá completar nuestro MVP y lanzarlo al mercado.",
    matchScore: 82,
    percentageFunded: 40,
    createdAt: "2025-05-08",
  },
  {
    id: 3,
    borrower: "carol.near",
    borrowerScore: 85,
    purpose: "Startup Sostenible",
    category: "greentech",
    amount: 2000,
    currency: "NEAR",
    term: 12,
    interestRate: 6.0,
    paymentFrequency: "mensual",
    risk: "medio",
    storyExcerpt: "Nuestra startup desarrolla soluciones para reducir el consumo energético en hogares. Este financiamiento nos ayudará a producir nuestro primer lote de dispositivos.",
    matchScore: 68,
    percentageFunded: 25,
    createdAt: "2025-05-05",
  },
  {
    id: 4,
    borrower: "david.near",
    borrowerScore: 65,
    purpose: "Startup HealthTech",
    category: "health",
    amount: 800,
    currency: "NEAR",
    term: 8,
    interestRate: 4.8,
    paymentFrequency: "mensual",
    risk: "alto",
    storyExcerpt: "Estamos desarrollando una aplicación que conecta pacientes con profesionales de la salud. Este financiamiento cubrirá los costos de desarrollo y certificaciones médicas.",
    matchScore: 55,
    percentageFunded: 15,
    createdAt: "2025-05-12",
  },
  {
    id: 5,
    borrower: "eve.near",
    borrowerScore: 94,
    purpose: "Startup DeFi",
    category: "fintech",
    amount: 3000,
    currency: "NEAR",
    term: 24,
    interestRate: 7.2,
    paymentFrequency: "mensual",
    risk: "bajo",
    storyExcerpt: "Estoy lanzando una aplicación descentralizada en NEAR que revoluciona los préstamos P2P. El financiamiento nos permitirá completar auditorías de seguridad y marketing inicial.",
    matchScore: 88,
    percentageFunded: 75,
    createdAt: "2025-05-01",
  },
];

type SortOption = "match" | "recent" | "amount" | "rate";  // coincidencia | reciente | monto | tasa
type FilterState = {
  minAmount: number;
  maxAmount: number;
  riskLevels: string[];
  categories: string[];
};

export function LoanMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minAmount: 0,
    maxAmount: 5000,
    riskLevels: ["bajo", "medio", "alto"],
    categories: ["tech", "education", "health", "fintech", "greentech"],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option: SortOption) => {
    setSortBy(option);
  };

  const handleRiskFilterChange = (risk: string) => {
    setFilters(prev => {
      if (prev.riskLevels.includes(risk)) {
        return { ...prev, riskLevels: prev.riskLevels.filter(r => r !== risk) };
      } else {
        return { ...prev, riskLevels: [...prev.riskLevels, risk] };
      }
    });
  };

  const handleCategoryFilterChange = (category: string) => {
    setFilters(prev => {
      if (prev.categories.includes(category)) {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      } else {
        return { ...prev, categories: [...prev.categories, category] };
      }
    });
  };

  const handleAmountRangeChange = (values: number[]) => {
    setFilters(prev => ({ ...prev, minAmount: values[0], maxAmount: values[1] }));
  };

  // Filtrar y ordenar solicitudes de préstamos
  const filteredRequests = mockLoanRequests
    .filter((loan) => {
      // Aplicar filtro de término de búsqueda
      const searchLower = searchTerm.toLowerCase();
      if (
        searchTerm &&
        !loan.purpose.toLowerCase().includes(searchLower) &&
        !loan.borrower.toLowerCase().includes(searchLower) &&
        !loan.category.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      // Aplicar filtro de monto
      if (loan.amount < filters.minAmount || loan.amount > filters.maxAmount) {
        return false;
      }

      // Aplicar filtro de nivel de riesgo
      if (!filters.riskLevels.includes(loan.risk)) {
        return false;
      }

      // Aplicar filtro de categoría
      if (!filters.categories.includes(loan.category)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore;
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "amount":
          return b.amount - a.amount;
        case "rate":
          return b.interestRate - a.interestRate;
        default:
          return 0;
      }
    });

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-success text-success-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "high":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold">Marketplace de Startups</h2>
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar startups..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Ordenar</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSort("match")}>
                  Mejor coincidencia
                  {sortBy === "match" && <Badge className="ml-2">Activo</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("recent")}>
                  Más reciente
                  {sortBy === "recent" && <Badge className="ml-2">Activo</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("amount")}>
                  Mayor monto
                  {sortBy === "amount" && <Badge className="ml-2">Activo</Badge>}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("rate")}>
                  Mayor tasa
                  {sortBy === "rate" && <Badge className="ml-2">Activo</Badge>}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="outline" 
              className="gap-1"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>
      </div>

      {filtersOpen && (
        <Card className="p-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium mb-3">Monto del Financiamiento</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[filters.minAmount, filters.maxAmount]}
                  max={5000}
                  step={100}
                  minStepsBetweenThumbs={1}
                  onValueChange={handleAmountRangeChange}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.minAmount} NEAR</span>
                <span>{filters.maxAmount} NEAR</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-fintech" 
                    checked={filters.categories.includes("fintech")}
                    onCheckedChange={() => handleCategoryFilterChange("fintech")} 
                  />
                  <label
                    htmlFor="cat-fintech"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    FinTech
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-greentech" 
                    checked={filters.categories.includes("greentech")}
                    onCheckedChange={() => handleCategoryFilterChange("greentech")} 
                  />
                  <label
                    htmlFor="cat-greentech"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    GreenTech
                  </label>
                </div>
              </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Nivel de Riesgo</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="risk-low" 
                    checked={filters.riskLevels.includes("bajo")}
                    onCheckedChange={() => handleRiskFilterChange("bajo")} 
                  />
                  <label
                    htmlFor="risk-low"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
                    Riesgo Bajo
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="risk-medium" 
                    checked={filters.riskLevels.includes("medio")}
                    onCheckedChange={() => handleRiskFilterChange("medio")} 
                  />
                  <label
                    htmlFor="risk-medium"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-warning mr-1.5"></span>
                    Riesgo Medio
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="risk-high" 
                    checked={filters.riskLevels.includes("alto")}
                    onCheckedChange={() => handleRiskFilterChange("alto")} 
                  />
                  <label
                    htmlFor="risk-high"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-destructive mr-1.5"></span>
                    Riesgo Alto
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Categorías</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-tech" 
                    checked={filters.categories.includes("tech")}
                    onCheckedChange={() => handleCategoryFilterChange("tech")} 
                  />
                  <label
            htmlFor="cat-health"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            HealthTech
          </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-education" 
                    checked={filters.categories.includes("education")}
                    onCheckedChange={() => handleCategoryFilterChange("education")} 
                  />
                  <label
                    htmlFor="cat-education"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    EdTech
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-health" 
                    checked={filters.categories.includes("health")}
                    onCheckedChange={() => handleCategoryFilterChange("health")} 
                  />
        <label
          htmlFor="cat-tech"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Tecnología
        </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-housing" 
                    checked={filters.categories.includes("housing")}
                    onCheckedChange={() => handleCategoryFilterChange("housing")} 
                  />
                  <label
                    htmlFor="cat-housing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vivienda
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cat-personal" 
                    checked={filters.categories.includes("personal")}
                    onCheckedChange={() => handleCategoryFilterChange("personal")} 
                  />
                  <label
                    htmlFor="cat-personal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Personal
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {filteredRequests.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((loan) => (
            <Card key={loan.id} className="overflow-hidden flex flex-col">
              <div 
                className={`h-1 w-full ${
                  loan.risk === "bajo" 
                    ? "bg-gradient-to-r from-green-400 to-green-600" 
                    : loan.risk === "medio" 
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600" 
                    : "bg-gradient-to-r from-red-400 to-red-600"
                }`}
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{loan.purpose}</CardTitle>
                  <Badge className="ml-2" variant="secondary">{loan.matchScore}% match</Badge>
                </div>
                <CardDescription className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{loan.borrower}</span>
                  </div>
                  <Badge className={`${getRiskBadgeClass(loan.risk)} text-xs`}>
                    Riesgo {loan.risk}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Monto:</div>
                      <div className="font-medium">{loan.amount} {loan.currency}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Plazo:</div>
                      <div className="font-medium">{loan.term} meses</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Interés:</div>
                      <div className="font-medium">{loan.interestRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Pagos:</div>
                      <div className="font-medium">{loan.paymentFrequency}</div>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible>
                    <AccordionItem value="story">
                      <AccordionTrigger className="py-2 text-sm">Historia del Prestatario</AccordionTrigger>
                      <AccordionContent className="text-sm">
                        {loan.storyExcerpt}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progreso de financiación:</span>
                      <span>{loan.percentageFunded}%</span>
                    </div>
                    <Progress value={loan.percentageFunded} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="default" asChild className="w-full">
                  <Link to={`/loan-details/${loan.id}`}>Ver Detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card border rounded-md">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No loan requests found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mt-2">
            Try adjusting your filters or search terms to find more loan opportunities.
          </p>
        </div>
      )}
    </div>
  );
}
