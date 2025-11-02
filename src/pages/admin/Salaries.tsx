import { useState, useMemo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { FileDown, Pencil, Save } from "lucide-react"
import jsPDF from "jspdf"
import "jspdf-autotable"

const Salaries = () => {
  // Current month/year
  const [currentDate] = useState(new Date())
  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Employee salary data
  const [salaries, setSalaries] = useState([
    { name: "Ravi Kumar", basic: 18000, daysPresent: 22, otHours: 5, otRate: 100, editing: false },
    { name: "Anita Sharma", basic: 20000, daysPresent: 24, otHours: 8, otRate: 120, editing: false },
    { name: "Kiran Patel", basic: 17500, daysPresent: 20, otHours: 3, otRate: 90, editing: false },
    { name: "Vijay Rao", basic: 22000, daysPresent: 25, otHours: 4, otRate: 110, editing: false },
    { name: "Leela Prasad", basic: 19500, daysPresent: 23, otHours: 6, otRate: 100, editing: false },
  ])

  // Auto calculate total salary
  const calculateTotal = (emp: any) => {
    const dailyRate = emp.basic / 26 // assume 26 working days
    const base = dailyRate * emp.daysPresent
    const ot = emp.otHours * emp.otRate
    return Math.round(base + ot)
  }

  // Edit toggle
  const toggleEdit = (index: number) => {
    setSalaries((prev) =>
      prev.map((emp, i) => (i === index ? { ...emp, editing: !emp.editing } : emp))
    )
  }

  // Handle field change
  const handleChange = (index: number, field: string, value: any) => {
    setSalaries((prev) =>
      prev.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp))
    )
  }

  // Export all data to PDF
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`Salary Report - ${monthYear}`, 14, 20)

    const tableData = salaries.map((emp) => [
      monthYear,
      emp.name,
      emp.basic,
      emp.daysPresent,
      emp.otHours,
      emp.otRate,
      calculateTotal(emp),
    ])

    ;(doc as any).autoTable({
      head: [
        ["Month", "Employee Name", "Basic Wages", "Days Present", "OT Hours", "OT Rate", "Total Salary"],
      ],
      body: tableData,
      startY: 30,
    })

    doc.save(`Salary_Report_${monthYear}.pdf`)
  }

  // Placeholder for Generate Salary Slip (per employee)
  const generateSlip = (emp: any) => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(`Salary Slip - ${emp.name}`, 14, 20)
    doc.text(`Month: ${monthYear}`, 14, 30)

    const total = calculateTotal(emp)
    ;(doc as any).autoTable({
      body: [
        ["Basic Wages", emp.basic],
        ["Days Present", emp.daysPresent],
        ["OT Hours", emp.otHours],
        ["OT Rate (₹/hr)", emp.otRate],
        ["Total Salary (₹)", total],
      ],
      startY: 40,
      theme: "grid",
    })

    doc.save(`SalarySlip_${emp.name}_${monthYear}.pdf`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground pt-24">
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h1 className="text-4xl font-bold text-foreground">Salary Management</h1>
              <Button variant="default" onClick={exportPDF}>
                <FileDown className="mr-2 h-4 w-4" /> Export Full Report (PDF)
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-border shadow-[var(--shadow-card)]">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-3 text-left font-semibold">Month</th>
                    <th className="p-3 text-left font-semibold">Employee</th>
                    <th className="p-3 text-center font-semibold">Basic Wages</th>
                    <th className="p-3 text-center font-semibold">Days Present</th>
                    <th className="p-3 text-center font-semibold">OT Hours</th>
                    <th className="p-3 text-center font-semibold">OT ₹/hr</th>
                    <th className="p-3 text-center font-semibold">Total Salary</th>
                    <th className="p-3 text-center font-semibold">Save</th>
                    <th className="p-3 text-center font-semibold">Edit</th>
                    <th className="p-3 text-center font-semibold">Salary Slip</th>
                  </tr>
                </thead>

                <tbody>
                  {salaries.map((emp, index) => {
                    const total = calculateTotal(emp)
                    return (
                      <tr key={index} className="even:bg-muted/40 hover:bg-primary/10 transition-colors">
                        <td className="p-3">{monthYear}</td>
                        <td className="p-3 font-medium">{emp.name}</td>

                        <td className="p-2 text-center">
                          {emp.editing ? (
                            <input
                              type="number"
                              value={emp.basic}
                              onChange={(e) => handleChange(index, "basic", +e.target.value)}
                              className="w-20 text-center border rounded bg-background"
                            />
                          ) : (
                            `₹${emp.basic}`
                          )}
                        </td>

                        <td className="p-2 text-center">
                          {emp.editing ? (
                            <input
                              type="number"
                              value={emp.daysPresent}
                              onChange={(e) => handleChange(index, "daysPresent", +e.target.value)}
                              className="w-16 text-center border rounded bg-background"
                            />
                          ) : (
                            emp.daysPresent
                          )}
                        </td>

                        <td className="p-2 text-center">
                          {emp.editing ? (
                            <input
                              type="number"
                              value={emp.otHours}
                              onChange={(e) => handleChange(index, "otHours", +e.target.value)}
                              className="w-16 text-center border rounded bg-background"
                            />
                          ) : (
                            emp.otHours
                          )}
                        </td>

                        <td className="p-2 text-center">
                          {emp.editing ? (
                            <input
                              type="number"
                              value={emp.otRate}
                              onChange={(e) => handleChange(index, "otRate", +e.target.value)}
                              className="w-16 text-center border rounded bg-background"
                            />
                          ) : (
                            `₹${emp.otRate}`
                          )}
                        </td>

                        <td className="p-2 text-center font-semibold text-primary">
                          ₹{total.toLocaleString("en-IN")}
                        </td>

                        <td className="p-2 text-center">
                          <Button variant="secondary" size="sm" onClick={() => toggleEdit(index)}>
                            <Save className="h-4 w-4" />
                          </Button>
                        </td>

                        <td className="p-2 text-center">
                          <Button variant="secondary" size="sm" onClick={() => toggleEdit(index)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </td>

                        <td className="p-2 text-center">
                          <Button variant="default" size="sm" onClick={() => generateSlip(emp)}>
                            Slip
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Salaries
