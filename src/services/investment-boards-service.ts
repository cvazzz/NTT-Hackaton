// Servicio compartido para los datos de juntas de inversión

// Tipos de datos para las juntas de inversión
export interface InvestmentBoard {
  id: number;
  name: string;
  members: number;
  activeLoanRequests?: number;
  focus?: string;
  totalInvested: number;
  currency: string;
  averageReturn: number;
  fundedStartups?: number;
  nextMeeting?: string;
  description: string;
  matchScore?: number;
  risk?: string;
}

export interface BoardInvitation {
  id: number;
  boardName: string;
  invitedBy: string;
  sentAt: string;
}

export interface PastLoan {
  id: number;
  startupName: string;
  purpose: string;
  amount: number;
  currency: string;
  term: string;
  status: string;
  returnRate: number;
  fundedAt: string;
  completedAt?: string;
}

// Datos compartidos de juntas de inversión
const investmentBoards: InvestmentBoard[] = [
  {
    id: 1,
    name: "Junta de Inversión en Tecnología",
    members: 5,
    activeLoanRequests: 3,
    focus: "Startups de tecnología y software",
    totalInvested: 5000,
    currency: "NEAR",
    averageReturn: 6.2,
    fundedStartups: 4,
    nextMeeting: "2025-06-15",
    description: "Grupo de inversores enfocados en startups de tecnología y software en fase semilla.",
    matchScore: 95,
    risk: "bajo"
  },
  {
    id: 2,
    name: "Junta de Startups Sostenibles",
    members: 8,
    activeLoanRequests: 2,
    focus: "Startups de educación y e-learning",
    totalInvested: 12000,
    currency: "NEAR",
    averageReturn: 5.8,
    fundedStartups: 6,
    nextMeeting: "2025-06-10",
    description: "Inversores comprometidos con startups enfocadas en sostenibilidad y economía circular.",
    matchScore: 82,
    risk: "medio"
  },
  {
    id: 3,
    name: "Aceleradora de Startups Blockchain",
    members: 12,
    focus: "Proyectos basados en blockchain",
    totalInvested: 15000,
    currency: "NEAR",
    averageReturn: 7.2,
    fundedStartups: 10,
    nextMeeting: "2025-06-20",
    description: "Grupo de inversores especializados en proyectos que utilizan tecnología blockchain para resolver problemas reales.",
    matchScore: 88,
    risk: "bajo"
  },
  {
    id: 4,
    name: "Inversores en Sostenibilidad",
    members: 6,
    focus: "Startups de energía renovable y sostenibilidad",
    totalInvested: 7500,
    currency: "NEAR",
    averageReturn: 5.5,
    fundedStartups: 5,
    nextMeeting: "2025-06-25",
    description: "Junta dedicada a financiar proyectos que promueven la sostenibilidad y el cuidado del medio ambiente.",
    matchScore: 68,
    risk: "medio"
  },
];

// Datos de invitaciones a juntas
const boardInvitations: BoardInvitation[] = [
  {
    id: 101,
    boardName: "Junta de Fintech",
    invitedBy: "carlos.near",
    sentAt: "2025-05-28"
  }
];

// Datos de préstamos anteriores
const pastLoans: PastLoan[] = [
  {
    id: 101,
    startupName: "TechInnovate",
    purpose: "Desarrollo de Software B2B",
    amount: 2000,
    currency: "NEAR",
    term: "12 meses",
    status: "completado",
    returnRate: 6.5,
    fundedAt: "2024-01-15",
    completedAt: "2025-01-10"
  },
  {
    id: 102,
    startupName: "EduLearn",
    purpose: "Plataforma de Aprendizaje",
    amount: 1500,
    currency: "NEAR",
    term: "9 meses",
    status: "activo",
    returnRate: 5.8,
    fundedAt: "2024-08-20"
  },
  {
    id: 103,
    startupName: "GreenTech",
    purpose: "Expansión de Mercado",
    amount: 3000,
    currency: "NEAR",
    term: "18 meses",
    status: "activo",
    returnRate: 7.2,
    fundedAt: "2024-06-05"
  },
];

// Funciones del servicio
export const InvestmentBoardsService = {
  // Obtener todas las juntas de inversión
  getAllBoards: () => investmentBoards,
  
  // Obtener una junta por su ID
  getBoardById: (id: number) => investmentBoards.find(board => board.id === id),
  
  // Obtener invitaciones a juntas
  getBoardInvitations: () => boardInvitations,
  
  // Obtener préstamos anteriores
  getPastLoans: () => pastLoans,
  
  // Obtener préstamos de una junta específica
  getBoardPastLoans: (boardId: number) => pastLoans,
};