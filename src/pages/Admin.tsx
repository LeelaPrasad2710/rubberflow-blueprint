import { ClipboardList, DollarSign, FileText, Factory } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();
  
  const adminModules = [
    {
      title: "Attendance Tracker",
      description: "Manage employee attendance and track working hours",
      icon: ClipboardList,
      path: "/admin/attendance",
    },
    {
      title: "Salaries",
      description: "Process payroll and generate salary slips",
      icon: DollarSign,
      path: "/admin/salaries",
    },
    {
      title: "Invoice Generator",
      description: "Create and manage customer invoices with GST",
      icon: FileText,
      path: "/admin/invoices",
    },
    {
      title: "Production",
      description: "Track production batches and manage workflow",
      icon: Factory,
      path: "/admin/production",
    },
    {
      title: "Raw Material Track",
      description: "Track raw materials used and stock",
      icon: Factory,
      path: "/admin/rawMaterials",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-foreground mb-4">Admin Panel</h1>
            <p className="text-muted-foreground mb-8">Manage your business operations from one central location</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminModules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                          <CardDescription className="mt-1">{module.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => navigate(module.path)}
                      >
                        Open {module.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
