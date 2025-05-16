import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, DollarSign, Info } from "lucide-react";
import { useUserRole } from "@/contexts/user-role-context";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Datos simulados para pagos
const mockPayments = [
  {
    id: 1,
    loanId: 101,
    loanPurpose: "Expansión de Negocio",
    amount: 175,
    currency: "NEAR",
    dueDate: "2025-05-25",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 2,
    loanId: 102,
    loanPurpose: "Educación",
    amount: 125,
    currency: "NEAR",
    dueDate: "2025-06-01",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 3,
    loanId: 101,
    loanPurpose: "Expansión de Negocio",
    amount: 175,
    currency: "NEAR",
    dueDate: "2025-06-25",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 4,
    loanId: 103,
    loanPurpose: "Renovación del Hogar",
    amount: 200,
    currency: "NEAR",
    dueDate: "2025-07-10",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 5,
    loanId: 102,
    loanPurpose: "Educación",
    amount: 125,
    currency: "NEAR",
    dueDate: "2025-07-01",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 6,
    loanId: 101,
    loanPurpose: "Expansión de Negocio",
    amount: 175,
    currency: "NEAR",
    dueDate: "2025-07-25",
    status: "pending",
    isPrincipal: false,
    isInterest: true
  },
];

// Datos simulados para pagos completados
const mockCompletedPayments = [
  {
    id: 7,
    loanId: 101,
    loanPurpose: "Expansión de Negocio",
    amount: 175,
    currency: "NEAR",
    dueDate: "2025-04-25",
    paidDate: "2025-04-23",
    status: "completed",
    isPrincipal: false,
    isInterest: true
  },
  {
    id: 8,
    loanId: 102,
    loanPurpose: "Educación",
    amount: 125,
    currency: "NEAR",
    dueDate: "2025-05-01",
    paidDate: "2025-04-30",
    status: "completed",
    isPrincipal: false,
    isInterest: true
  },
];

// Función para obtener los nombres de los meses en español
const getMonthName = (monthIndex: number): string => {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return months[monthIndex];
};

// Función para generar los días del mes
const getDaysInMonth = (year: number, month: number): number[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

// Función para obtener el día de la semana (0 = Domingo, 1 = Lunes, etc.)
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const RepaymentCalendar = () => {
  const { role } = useUserRole();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Si el usuario no es un prestatario ni un prestamista, mostrar mensaje
  if (role !== "borrower" && role !== "lender") {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-medium">Acceso Restringido</h2>
          <p className="text-muted-foreground mt-2">Esta sección es solo para usuarios registrados.</p>
          <Link to="/dashboard">
            <Button className="mt-4">Volver al Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Función para ir al mes anterior
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Función para ir al mes siguiente
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Obtener los días del mes actual
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
  // Obtener el primer día de la semana del mes actual (0 = Domingo, 1 = Lunes, etc.)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
  const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

  // Filtrar pagos para el mes actual
  const paymentsThisMonth = [...mockPayments, ...mockCompletedPayments].filter(payment => {
    const paymentDate = new Date(payment.dueDate);
    return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
  });

  // Crear un mapa de pagos por día
  const paymentsByDay = paymentsThisMonth.reduce((acc, payment) => {
    const day = new Date(payment.dueDate).getDate();
    if (!acc[day]) acc[day] = [];
    acc[day].push(payment);
    return acc;
  }, {} as Record<number, typeof mockPayments>);

  // Nombres de los días de la semana en español
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Calendario de Pagos</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>
              {getMonthName(currentMonth)} {currentYear}
            </CardTitle>
            <Button variant="outline" size="icon" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, index) => (
              <div key={index} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-1">
            {/* Espacios vacíos para ajustar el primer día del mes */}
            {Array.from({ length: adjustedFirstDay }, (_, i) => (
              <div key={`empty-${i}`} className="h-24 p-1 border rounded-md bg-muted/20"></div>
            ))}

            {/* Días del mes */}
            {daysInMonth.map((day) => {
              const isToday = day === today.getDate() && 
                            currentMonth === today.getMonth() && 
                            currentYear === today.getFullYear();
              const hasPayments = paymentsByDay[day] && paymentsByDay[day].length > 0;
              
              return (
                <div 
                  key={day} 
                  className={`h-24 p-1 border rounded-md ${isToday ? 'border-primary' : ''} ${hasPayments ? 'bg-green-50' : ''} overflow-auto`}
                >
                  <div className={`text-right font-medium text-sm mb-1 ${isToday ? 'text-primary' : ''}`}>
                    {day}
                  </div>
                  
                  {/* Pagos del día */}
                  {hasPayments && paymentsByDay[day].map((payment) => (
                    <div 
                      key={payment.id} 
                      className={`text-xs p-1 mb-1 rounded ${payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      <div className="font-medium truncate">{payment.loanPurpose}</div>
                      <div className="flex justify-between items-center">
                        <span>{payment.amount} {payment.currency}</span>
                        {payment.status === 'completed' && (
                          <Badge variant="outline" className="text-[10px] h-4">Pagado</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Próximos pagos */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Próximos Pagos</h3>
        
        {mockPayments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockPayments
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 3)
              .map((payment) => (
                <Card key={payment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{payment.loanPurpose}</CardTitle>
                    <CardDescription>
                      Vencimiento: {new Date(payment.dueDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-2xl font-bold">{payment.amount} {payment.currency}</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pendiente
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-loans/${payment.loanId}`}>Ver Préstamo</Link>
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
            <h3 className="text-lg font-medium">No hay pagos pendientes</h3>
            <p className="text-muted-foreground mb-4">No tienes pagos programados en este momento.</p>
          </div>
        )}
      </div>

      {/* Pagos recientes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pagos Recientes</h3>
        
        {mockCompletedPayments.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCompletedPayments
              .sort((a, b) => new Date(b.paidDate!).getTime() - new Date(a.paidDate!).getTime())
              .map((payment) => (
                <Card key={payment.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{payment.loanPurpose}</CardTitle>
                    <CardDescription>
                      Pagado el: {new Date(payment.paidDate!).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-2xl font-bold">{payment.amount} {payment.currency}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Completado
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/my-loans/${payment.loanId}`}>Ver Préstamo</Link>
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
            <h3 className="text-lg font-medium">No hay pagos completados</h3>
            <p className="text-muted-foreground mb-4">Tu historial de pagos aparecerá aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepaymentCalendar;