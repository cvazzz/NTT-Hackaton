
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserRoleProvider } from "@/contexts/user-role-context";
import { AppLayout } from "@/components/app-layout";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RequestLoan from "./pages/RequestLoan";
import ExploreRequests from "./pages/ExploreRequests";
import LoanDetails from "./pages/LoanDetails";
import MyLoans from "./pages/MyLoans";
import MyInvestments from "./pages/MyInvestments";
import Communities from "./pages/Communities";
import RepaymentCalendar from "./pages/RepaymentCalendar";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import ActiveLoanDetails from "./pages/ActiveLoanDetails";
import Boards from "./pages/Boards";
import BoardDetails from "./pages/BoardDetails";
import BoardInvestment from "./pages/BoardInvestment";
import StartupRequirementsPage from "./pages/StartupRequirements";
import InvestmentBoardsExplorerPage from "./pages/InvestmentBoardsExplorer";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserRoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<Index />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/request-loan" element={<RequestLoan />} />
              <Route path="/explore-requests" element={<ExploreRequests />} />
              <Route path="/loan-details/:id" element={<LoanDetails />} />
              <Route path="/my-loans" element={<MyLoans />} />
              <Route path="/my-loans/:id" element={<ActiveLoanDetails />} />
              <Route path="/my-investments" element={<MyInvestments />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/boards" element={<Boards />} />
              <Route path="/boards/:id" element={<BoardDetails />} />
              <Route path="/board-investment" element={<BoardInvestment />} />
              <Route path="/startup-requirements" element={<StartupRequirementsPage />} />
              <Route path="/investment-boards-explorer" element={<InvestmentBoardsExplorerPage />} />
              <Route path="/repayment-calendar" element={<RepaymentCalendar />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserRoleProvider>
  </QueryClientProvider>
);

export default App;
