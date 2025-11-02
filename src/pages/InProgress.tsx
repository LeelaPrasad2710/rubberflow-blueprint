import { Construction } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const InProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getModuleName = () => {
    const path = location.pathname;
    if (path.includes("attendance")) return "Attendance Tracker";
    if (path.includes("salaries")) return "Salaries";
    if (path.includes("invoices")) return "Invoice Generator";
    if (path.includes("production")) return "Production";
    return "This Module";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <Construction className="h-24 w-24 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {getModuleName()}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Development is in Progress
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We're working hard to bring you this feature. Please check back soon!
          </p>
          <Button onClick={() => navigate("/admin")} variant="default">
            Back to Admin Panel
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InProgress;
