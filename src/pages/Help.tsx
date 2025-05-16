import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, HelpCircle, MessageCircle, FileText, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Datos simulados para preguntas frecuentes
const mockFAQs = [
  {
    id: 1,
    question: "¿Cómo funciona el sistema de préstamos en la plataforma?",
    answer: "Nuestra plataforma conecta prestatarios con prestamistas en la comunidad NEAR. Los prestatarios pueden solicitar préstamos especificando el monto, propósito y plazo. Los prestamistas pueden revisar estas solicitudes y decidir si desean financiarlas total o parcialmente. Una vez que un préstamo está completamente financiado, los fondos se transfieren al prestatario, quien luego realiza pagos periódicos según el calendario acordado."
  },
  {
    id: 2,
    question: "¿Cómo se determinan las tasas de interés?",
    answer: "Las tasas de interés se determinan mediante un algoritmo que considera varios factores, incluyendo el historial crediticio del prestatario, el propósito del préstamo, el plazo y las condiciones actuales del mercado. Los prestatarios pueden proponer una tasa, pero la comunidad y nuestro sistema pueden ajustarla según el perfil de riesgo."
  },
  {
    id: 3,
    question: "¿Qué sucede si un prestatario no paga?",
    answer: "Si un prestatario no realiza un pago a tiempo, primero recibe recordatorios. Si los pagos siguen sin realizarse, se activa nuestro protocolo de resolución de impagos, que puede incluir la renegociación del préstamo, la extensión del plazo o, en casos extremos, la activación del fondo de garantía comunitario para compensar a los prestamistas. Los prestatarios que no pagan verán afectada su puntuación crediticia en la plataforma."
  },
  {
    id: 4,
    question: "¿Cómo puedo aumentar mis posibilidades de obtener un préstamo?",
    answer: "Para aumentar tus posibilidades, asegúrate de completar tu perfil con información detallada, proporcionar un propósito claro para el préstamo, establecer un plazo y tasa de interés razonables, y mantener un buen historial de pagos en préstamos anteriores. También puedes unirte a comunidades activas y construir tu reputación participando en la plataforma."
  },
  {
    id: 5,
    question: "¿Cómo se protege mi privacidad y seguridad?",
    answer: "Utilizamos tecnología blockchain para garantizar la seguridad de las transacciones y protocolos de encriptación para proteger tus datos personales. Tu información financiera detallada nunca se comparte con otros usuarios sin tu consentimiento. Además, puedes ajustar tu configuración de privacidad para controlar qué información es visible para otros usuarios de la plataforma."
  },
  {
    id: 6,
    question: "¿Puedo invertir en múltiples préstamos?",
    answer: "Sí, de hecho, recomendamos diversificar tus inversiones entre varios préstamos para reducir el riesgo. Puedes establecer montos mínimos de inversión y distribuir tus fondos entre diferentes prestatarios, categorías de préstamos y niveles de riesgo."
  },
];

// Datos simulados para guías
const mockGuides = [
  {
    id: 1,
    title: "Guía para Nuevos Prestatarios",
    description: "Aprende cómo solicitar tu primer préstamo en la plataforma",
    icon: <FileText className="h-6 w-6" />,
    link: "/help/guides/borrowers"
  },
  {
    id: 2,
    title: "Guía para Nuevos Prestamistas",
    description: "Descubre cómo comenzar a invertir en préstamos comunitarios",
    icon: <FileText className="h-6 w-6" />,
    link: "/help/guides/lenders"
  },
  {
    id: 3,
    title: "Entendiendo los Riesgos",
    description: "Información importante sobre los riesgos de préstamos e inversiones",
    icon: <FileText className="h-6 w-6" />,
    link: "/help/guides/risks"
  },
  {
    id: 4,
    title: "Comunidades de Préstamo",
    description: "Cómo unirse y participar en comunidades de préstamo",
    icon: <FileText className="h-6 w-6" />,
    link: "/help/guides/communities"
  },
];

// Datos simulados para recursos
const mockResources = [
  {
    id: 1,
    title: "Documentación de la API",
    description: "Recursos técnicos para desarrolladores",
    link: "https://docs.example.com/api"
  },
  {
    id: 2,
    title: "Términos y Condiciones",
    description: "Información legal sobre el uso de la plataforma",
    link: "/legal/terms"
  },
  {
    id: 3,
    title: "Política de Privacidad",
    description: "Cómo manejamos y protegemos tus datos",
    link: "/legal/privacy"
  },
  {
    id: 4,
    title: "Blog de la Comunidad",
    description: "Artículos y actualizaciones sobre finanzas descentralizadas",
    link: "https://blog.example.com"
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("faq");

  // Filtrar FAQs basado en el término de búsqueda
  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Centro de Ayuda</h2>
        <Button asChild variant="outline">
          <Link to="/contact">
            <MessageCircle className="mr-2 h-4 w-4" /> Contactar Soporte
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar en el centro de ayuda..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="guides">Guías</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchTerm && filteredFAQs.length === 0 ? (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No se encontraron resultados</h3>
                  <p className="text-muted-foreground">Intenta con otra búsqueda o explora las categorías.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guías y Tutoriales</CardTitle>
              <CardDescription>
                Recursos detallados para ayudarte a aprovechar al máximo la plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          {guide.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-medium">{guide.title}</h4>
                          <p className="text-sm text-muted-foreground">{guide.description}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 px-6 py-3">
                      <Button asChild variant="ghost" className="w-full justify-start">
                        <Link to={guide.link}>
                          Ver Guía
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recursos Adicionales</CardTitle>
              <CardDescription>
                Enlaces útiles y documentación para profundizar tu conocimiento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-6">
                      <h4 className="text-base font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                      <Button asChild variant="link" className="px-0 mt-2">
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          Acceder
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Necesitas más ayuda?</CardTitle>
              <CardDescription>
                Nuestro equipo de soporte está listo para asistirte.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link to="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" /> Contactar Soporte
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a href="https://discord.example.com" target="_blank" rel="noopener noreferrer">
                  Unirse a la Comunidad
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Componente auxiliar para el icono de flecha derecha
const ChevronRight = ({ className }: { className?: string }) => (
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
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default Help;