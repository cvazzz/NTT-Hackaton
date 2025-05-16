
import { useUserRole } from "@/contexts/user-role-context";
import { BorrowerDashboard } from "@/components/borrower/borrower-dashboard";
import { LenderDashboard } from "@/components/lender/lender-dashboard";

const Dashboard = () => {
  const { role } = useUserRole();

  return (
    <div>
      {role === "borrower" ? <BorrowerDashboard /> : <LenderDashboard />}
    </div>
  );
};

export default Dashboard;
