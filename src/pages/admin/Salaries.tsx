import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileDown, Pencil, Save } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Salary {
  id: number | null;
  employeeId: number;
  employeeName: string;
  wages: number;
  month: string;
  daysPresent: number;
  otHours: number;
  misc: number;
  comments: string;
  totalSalary: number;
  editing?: boolean;
  dirty?: boolean;
}

const Salaries = () => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/salaries/setup?year=2025&month=11");
        if (!res.ok) throw new Error("Failed to fetch salaries");
        const rawData = await res.json();

        const normalized = (rawData || []).map((s: any) => ({
          id: s.id ?? null,
          employeeId: s.employeeId,
          employeeName: s.employeeName,
          wages: s.wages,
          month: s.month,
          daysPresent: s.daysPresent ?? 0,
          otHours: s.otHours ?? 0,
          misc: s.misc ?? 0,
          comments: s.comments ?? "",
          totalSalary: s.totalSalary ?? 0,
          editing: false,
          dirty: false,
        }));

        setSalaries(normalized);
      } catch (err) {
        console.error("❌ Error fetching salaries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  // Recalculate total salary
  const recalculate = (salary: Salary) => {
    const base = salary.wages * salary.daysPresent;
    const otAmount = (salary.wages / 8) * salary.otHours;
    const total = base + otAmount + salary.misc;
    return Math.round(total);
  };

  // Handle field change (only for misc/comments)
  const handleChange = (index: number, field: keyof Salary, value: any) => {
    if (field === "daysPresent" || field === "otHours") return; // 🚫 prevent editing
    const updated = [...salaries];
    updated[index] = {
      ...updated[index],
      [field]: value,
      totalSalary: recalculate({ ...updated[index], [field]: value }),
      dirty: true,
    };
    setSalaries(updated);
  };

  // Toggle edit mode (only enables misc/comments fields)
  const toggleEdit = (index: number) => {
    const updated = [...salaries];
    updated[index].editing = !updated[index].editing;
    setSalaries(updated);
  };

const handleSave = async (index: number) => {
  const salary = salaries[index];
  const total = recalculate(salary);

  try {
    const res = await fetch("http://localhost:4000/api/salaries/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: salary.id,
        employeeId: salary.employeeId,
        month: salary.month,
        daysPresent: salary.daysPresent ?? 0,
        otHours: salary.otHours ?? 0,
        misc: Number(salary.misc ?? 0),
        comments: salary.comments ?? "",
        totalSalary: total,
      }),
    });

    if (!res.ok) throw new Error("Failed to save salary");
    const saved = await res.json();

    const updated = [...salaries];
    updated[index] = { ...salary, ...saved, editing: false, dirty: false };
    setSalaries(updated);
    console.log("✅ Saved successfully:", saved);
    alert(`✅ Salary for ${salary.employeeName} saved successfully!`);
  } catch (err) {
    console.error("❌ Error saving salary:", err);
    alert("❌ Failed to save salary. Check console for details.");
  }
};


  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Report", 14, 20);
    const tableData = salaries.map((s) => [
      s.month,
      s.employeeName,
      s.wages,
      s.daysPresent,
      s.otHours,
      s.misc,
      s.comments,
      s.totalSalary,
    ]);
    (doc as any).autoTable({
      head: [["Month", "Employee", "Wages", "Days", "OT Hours", "Misc", "Comments", "Total"]],
      body: tableData,
      startY: 30,
    });
    doc.save("Salary_Report.pdf");
  };

  if (loading) return <div className="text-center mt-10">Loading salaries...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground pt-24">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold">Salary Management</h1>
              <Button onClick={exportPDF}>
                <FileDown className="mr-2 h-4 w-4" /> Export Report
              </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-3 text-left">Month</th>
                    <th className="p-3 text-left">Employee</th>
                    <th className="p-3 text-center">Wages (₹)</th>
                    <th className="p-3 text-center">Days Present</th>
                    <th className="p-3 text-center">OT Hours</th>
                    <th className="p-3 text-center">Misc</th>
                    <th className="p-3 text-center">Comments</th>
                    <th className="p-3 text-center">Total (₹)</th>
                    <th className="p-3 text-center">Edit</th>
                    <th className="p-3 text-center">Save</th>
                  </tr>
                </thead>
                <tbody>
                  {salaries.map((s, index) => (
                    <tr key={s.id ?? index} className="even:bg-muted/40 hover:bg-primary/10 transition">
                      <td className="p-3">{s.month}</td>
                      <td className="p-3">{s.employeeName}</td>
                      <td className="p-3 text-center">{s.wages}</td>
                      <td className="p-3 text-center">{s.daysPresent}</td>
                      <td className="p-3 text-center">{s.otHours}</td>

                      <td className="p-3 text-center">
                        {s.editing ? (
                          <input
                            type="number"
                            value={s.misc}
                            onChange={(e) =>
                              handleChange(index, "misc", Number(e.target.value))
                            }
                            className="w-16 text-center border rounded"
                          />
                        ) : (
                          s.misc
                        )}
                      </td>

                      <td className="p-3 text-center">
                        {s.editing ? (
                          <input
                            type="text"
                            value={s.comments}
                            onChange={(e) => handleChange(index, "comments", e.target.value)}
                            className="w-40 text-center border rounded"
                          />
                        ) : (
                          s.comments
                        )}
                      </td>

                      <td className="p-3 text-center font-semibold text-primary">
                        ₹{s.totalSalary.toLocaleString("en-IN")}
                      </td>

                      <td className="p-3 text-center">
                        <Button variant="secondary" size="sm" onClick={() => toggleEdit(index)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>

                      <td className="p-3 text-center">
                        <Button
                          variant={s.dirty ? "default" : "secondary"}
                          size="sm"
                          disabled={!s.dirty}
                          onClick={() => handleSave(index)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Salaries;
