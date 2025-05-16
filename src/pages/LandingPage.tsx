
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Users, 
  Shield, 
  TrendingUp, 
  CreditCard, 
  Star, 
  BarChart, 
  BookOpen, 
  Building, 
  MessageSquare,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const testimoniosRef = useRef<HTMLElement>(null);
  const estadisticasRef = useRef<HTMLElement>(null);
  const recursosRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navegación */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              NL
            </div>
            <span className="font-bold text-xl">NEAR Préstamos</span>
          </div>
          
          {/* Navegación de escritorio */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection(testimoniosRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection(estadisticasRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Estadísticas
            </button>
            <button 
              onClick={() => scrollToSection(recursosRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection(faqRef)} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </button>
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Ingresar
            </Link>
            <Button asChild>
              <Link to="/dashboard">Comenzar</Link>
            </Button>
          </div>
          
          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-muted-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white border-t">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection(testimoniosRef)} 
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                Testimonios
              </button>
              <button 
                onClick={() => scrollToSection(estadisticasRef)} 
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                Estadísticas
              </button>
              <button 
                onClick={() => scrollToSection(recursosRef)} 
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection(faqRef)} 
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                FAQ
              </button>
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary py-2">
                  Ingresar
                </Link>
                <Button asChild>
                  <Link to="/dashboard">Comenzar</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight">Financiamiento para startups en la blockchain de NEAR</h1>
          <p className="text-xl text-muted-foreground">
            Conectamos startups innovadoras con juntas de inversión en un entorno transparente, seguro y descentralizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Solicitar Financiamiento para Startup
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">
                Unirse como Inversor
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="/placeholder.svg" 
            alt="NEAR Préstamos" 
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>
      </section>

      {/* Características */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir NEAR Préstamos?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seguridad Garantizada</h3>
              <p className="text-muted-foreground">
                Todas las transacciones están respaldadas por contratos inteligentes en la blockchain de NEAR, garantizando total transparencia y seguridad.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Juntas de Inversión</h3>
              <p className="text-muted-foreground">
                Grupos de inversores que evalúan colectivamente las startups y toman decisiones de financiamiento para minimizar riesgos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Beneficios Mutuos</h3>
              <p className="text-muted-foreground">
                Las startups obtienen el capital necesario mientras los inversores reciben participación y retornos atractivos en empresas prometedoras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Cómo Funciona</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-primary">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Crea tu Perfil</h3>
            <p className="text-sm text-muted-foreground">
              Conéctate con tu wallet de NEAR y completa tu información básica para empezar.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-primary">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Solicita o Invierte</h3>
            <p className="text-sm text-muted-foreground">
              Crea una solicitud de préstamo o explora oportunidades para invertir según tu rol.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-primary">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Evaluación Comunitaria</h3>
            <p className="text-sm text-muted-foreground">
              Las solicitudes son evaluadas por la comunidad de prestamistas mediante votación.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold text-primary">4</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Gestión Transparente</h3>
            <p className="text-sm text-muted-foreground">
              Seguimiento completo del préstamo, pagos y rendimientos a través de la plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* Para Prestatarios y Prestamistas */}
      <section className="bg-gradient-to-r from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Soluciones para Todos</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Para Solicitantes</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Proceso de solicitud sencillo y guiado</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Tasas de interés más bajas que los préstamos tradicionales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Construcción de historial crediticio en blockchain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Flexibilidad en plazos y opciones de pago</span>
                </li>
              </ul>
              
              <Button asChild className="w-full">
                <Link to="/dashboard">Solicitar Préstamo</Link>
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Para Prestamistas</h3>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Acceso a oportunidades de inversión diversificadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Rendimientos atractivos con riesgo gestionado comunitariamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Herramientas analíticas avanzadas para toma de decisiones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span>Participación en comunidades de inversión colaborativa</span>
                </li>
              </ul>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/dashboard">Invertir Ahora</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section ref={testimoniosRef} className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
              </div>
              <p className="text-muted-foreground mb-6">
                "Gracias a NEAR Préstamos pude financiar la expansión de mi negocio cuando los bancos tradicionales me rechazaron. El proceso fue transparente y la comunidad muy solidaria."
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                    <span className="font-medium text-primary">ML</span>
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">María López</p>
                  <p className="text-sm text-muted-foreground">Emprendedora</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
              </div>
              <p className="text-muted-foreground mb-6">
                "Como prestamista, he diversificado mis inversiones y obtenido mejores rendimientos que con métodos tradicionales. La plataforma facilita la evaluación de riesgos."
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                    <span className="font-medium text-primary">JR</span>
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">Juan Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Inversor</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-1 mb-4 text-amber-500">
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="fill-amber-500 h-5 w-5" />
                <Star className="h-5 w-5" />
              </div>
              <p className="text-muted-foreground mb-6">
                "Pude financiar mis estudios de programación blockchain con condiciones mucho más favorables que un préstamo estudiantil tradicional. ¡Ahora trabajo en el ecosistema NEAR!"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <div className="bg-primary/10 h-full w-full flex items-center justify-center">
                    <span className="font-medium text-primary">AG</span>
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">Ana García</p>
                  <p className="text-sm text-muted-foreground">Desarrolladora</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Estadísticas */}
      <section ref={estadisticasRef} className="bg-gradient-to-r from-primary/5 to-primary/10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Nuestro Impacto en Números</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-muted-foreground">Usuarios Activos</div>
            </div>
            
            <div>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">$2.5M</div>
              <div className="text-muted-foreground">Préstamos Financiados</div>
            </div>
            
            <div>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">8.5%</div>
              <div className="text-muted-foreground">Rendimiento Promedio</div>
            </div>
            
            <div>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Building className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">Tasa de Éxito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog y Recursos */}
      <section ref={recursosRef} className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Recursos Educativos</h2>
          <Button variant="outline" asChild>
            <Link to="#">Ver todos los artículos</Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 relative">
              <Badge className="absolute top-4 right-4 bg-primary">Finanzas</Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Cómo evaluar el riesgo en préstamos P2P</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Aprende las mejores estrategias para analizar solicitudes de préstamo y minimizar riesgos en tus inversiones descentralizadas.  
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">5 min de lectura</span>
                </div>
                <Link to="#" className="text-primary hover:underline text-sm font-medium">Leer más</Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 relative">
              <Badge className="absolute top-4 right-4 bg-primary">Blockchain</Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Entendiendo los contratos inteligentes de NEAR</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Una guía para principiantes sobre cómo funcionan los contratos inteligentes que respaldan nuestra plataforma de préstamos.  
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">8 min de lectura</span>
                </div>
                <Link to="#" className="text-primary hover:underline text-sm font-medium">Leer más</Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 relative">
              <Badge className="absolute top-4 right-4 bg-primary">Guía</Badge>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Cómo crear una solicitud de préstamo exitosa</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Consejos prácticos para presentar tu caso de forma convincente y aumentar tus probabilidades de financiación.  
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">6 min de lectura</span>
                </div>
                <Link to="#" className="text-primary hover:underline text-sm font-medium">Leer más</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section ref={faqRef} className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  ¿Cómo se garantiza la seguridad de mis fondos?
                </AccordionTrigger>
                <AccordionContent>
                  Todos los fondos están respaldados por contratos inteligentes en la blockchain de NEAR, lo que garantiza transparencia y seguridad. Además, implementamos un sistema de evaluación comunitaria que minimiza el riesgo de préstamos fraudulentos.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  ¿Qué tasas de interés puedo esperar como prestamista?
                </AccordionTrigger>
                <AccordionContent>
                  Las tasas de interés varían según el perfil de riesgo del prestatario y el plazo del préstamo. En promedio, nuestros prestamistas obtienen entre un 5% y un 12% de rendimiento anual, significativamente superior a las alternativas tradicionales.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  ¿Cómo se evalúa mi solicitud de préstamo?
                </AccordionTrigger>
                <AccordionContent>
                  Tu solicitud es evaluada por la comunidad de prestamistas mediante un sistema de votación. Factores como tu historial en la plataforma, la claridad de tu propósito y la viabilidad de tu plan de pago son considerados en el proceso.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  ¿Qué ocurre si un prestatario no paga su préstamo?
                </AccordionTrigger>
                <AccordionContent>
                  Contamos con un sistema de garantías y un fondo de protección que mitiga el impacto de los impagos. Además, el historial de cada usuario queda registrado en la blockchain, lo que incentiva el cumplimiento de las obligaciones.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  ¿Necesito conocimientos técnicos para usar la plataforma?
                </AccordionTrigger>
                <AccordionContent>
                  No, nuestra plataforma está diseñada para ser intuitiva y fácil de usar. Solo necesitas una wallet de NEAR y seguir nuestras guías paso a paso. Ofrecemos recursos educativos para ayudarte en cada etapa del proceso.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="text-center mt-8">
            <Link to="#" className="text-primary hover:underline inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Ver todas las preguntas frecuentes</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comunidad */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Únete a nuestra comunidad</h2>
              <p className="text-lg mb-6">
                Forma parte de un ecosistema financiero en crecimiento. Comparte ideas, aprende de otros miembros y contribuye al desarrollo de las finanzas descentralizadas en NEAR.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discord
                </Button>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Telegram
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md h-64 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/30 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <p className="font-medium">+2,500 miembros activos</p>
                  <p className="text-sm text-muted-foreground">Conversaciones diarias sobre préstamos P2P</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Únete a la revolución financiera descentralizada y comienza a experimentar los beneficios de la primera plataforma de préstamos P2P en NEAR.
        </p>
        <Button size="lg" asChild>
          <Link to="/dashboard">
            Ingresar a la Plataforma
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                NL
              </div>
              <span className="font-bold text-xl">NEAR Préstamos</span>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center mb-6 md:mb-0">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Sobre Nosotros</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Cómo Funciona</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Preguntas Frecuentes</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contacto</Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © 2025 NEAR Préstamos
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
