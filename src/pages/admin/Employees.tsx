import { useEffect, useState, memo } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Pencil, Save, PlusCircle } from "lucide-react"

type Employee = {
  id?: number
  name: string
  age: number
  status: "Active" | "Inactive"
  joinedDate: string
  phone: string
  workType: string
  wages: number
  address: string
  isNew?: boolean
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [editingRow, setEditingRow] = useState<number | "new" | null>(null)

  // ✅ Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/employees")
      if (!res.ok) throw new Error("Failed to fetch employees")
      const data = await res.json()
      const sorted = data.sort((a: Employee, b: Employee) => (a.id ?? 0) - (b.id ?? 0))
      setEmployees(sorted)
    } catch (err) {
      console.error("Error fetching employees:", err)
    } finally {
      setLoading(false)
    }
  }

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();

      console.log("✅ Employee Data:", data);
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchEmployees();
}, []);


  // ✅ Add new employee
  const handleAddEmployee = () => {
    const newEmp: Employee = {
      name: "",
      age: 0,
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
      phone: "",
      workType: "",
      wages: 0,
      address: "",
      isNew: true,
    }
    setEmployees((prev) => [...prev, newEmp])
    setEditingRow("new")
  }

  // ✅ Save handler
  const handleSave = async (emp: Employee) => {
    const isNew = emp.isNew
    const url = isNew
      ? "http://localhost:4000/api/employees"
      : `http://localhost:4000/api/employees/${emp.id}`
    const method = isNew ? "POST" : "PUT"

    const payload = {
      name: emp.name,
      age: emp.age,
      status: emp.status,
      joinedDate: emp.joinedDate,
      phone: emp.phone,
      workType: emp.workType,
      wages: emp.wages,
      address: emp.address,
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to save employee")
      await fetchEmployees()
      setEditingRow(null)
    } catch (err) {
      console.error("Error saving employee:", err)
      alert("Error saving employee. Check console.")
    }
  }

  if (loading)
    return (
      <div className="text-center mt-20 text-lg text-muted-foreground">
        Loading employees...
      </div>
    )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground pt-24">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h1 className="text-4xl font-bold text-foreground">Employee Management</h1>
              <Button onClick={handleAddEmployee}>
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Employee
              </Button>
            </div>

            {/* ✅ Table */}
            <div className="overflow-x-auto rounded-lg border border-border shadow-[var(--shadow-card)]">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-3 text-center font-semibold">Emp ID</th>
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3 text-center font-semibold">Age</th>
                    <th className="p-3 text-center font-semibold">Status</th>
                    <th className="p-3 text-center font-semibold">Joined Date</th>
                    <th className="p-3 text-center font-semibold">Phone</th>
                    <th className="p-3 text-center font-semibold">Work Type</th>
                    <th className="p-3 text-center font-semibold">Wages (₹)</th>
                    <th className="p-3 text-center font-semibold">Address</th>
                    <th className="p-3 text-center font-semibold">Save</th>
                    <th className="p-3 text-center font-semibold">Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp, index) => (
                    <EmployeeRow
                      key={emp.id ?? `new-${index}`}
                      emp={emp}
                      index={index}
                      isEditing={
                        editingRow === emp.id || (editingRow === "new" && emp.isNew)
                      }
                      onEdit={() => setEditingRow(emp.id ?? "new")}
                      onSave={(data) => handleSave(data)}
                    />
                  ))}
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

export default Employees

// ✅ Memoized Employee Row Component
const EmployeeRow = memo(
  ({
    emp,
    index,
    isEditing,
    onEdit,
    onSave,
  }: {
    emp: Employee
    index: number
    isEditing: boolean
    onEdit: () => void
    onSave: (data: Employee) => void
  }) => {
    const [formData, setFormData] = useState<Employee>(emp)

    useEffect(() => setFormData(emp), [emp])

    const handleChange = (field: keyof Employee, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
      <tr className="even:bg-muted/40 hover:bg-primary/10 transition-colors">
        <td className="p-3 text-center">
          {emp.isNew ? "NEW" : String(index + 1).padStart(3, "0")}
        </td>

        <td className="p-3">
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded px-2 py-1 bg-background"
            />
          ) : (
            emp.name
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.age}
              onChange={(e) => handleChange("age", +e.target.value)}
              className="w-16 text-center border rounded bg-background"
            />
          ) : (
            emp.age
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value as "Active" | "Inactive")
              }
              className="border rounded px-2 py-1 bg-background"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          ) : (
            emp.status
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <input
              type="date"
              value={formData.joinedDate}
              onChange={(e) => handleChange("joinedDate", e.target.value)}
              className="border rounded px-2 py-1 bg-background"
            />
          ) : (
            formData.joinedDate
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-28 text-center border rounded bg-background"
            />
          ) : (
            emp.phone
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <input
              type="text"
              value={formData.workType}
              onChange={(e) => handleChange("workType", e.target.value)}
              className="w-28 text-center border rounded bg-background"
            />
          ) : (
            emp.workType
          )}
        </td>

        <td className="p-3 text-center">
          {isEditing ? (
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.wages}
              onChange={(e) => handleChange("wages", +e.target.value)}
              className="w-24 text-center border rounded bg-background"
            />
          ) : (
            `₹${emp.wages.toLocaleString("en-IN")}`
          )}
        </td>

        <td className="p-3">
          {isEditing ? (
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full border rounded px-2 py-1 bg-background"
            />
          ) : (
            emp.address
          )}
        </td>

        <td className="p-2 text-center">
          {isEditing ? (
            <Button size="sm" onClick={() => onSave(formData)}>
              <Save className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" variant="secondary" disabled>
              <Save className="h-4 w-4" />
            </Button>
          )}
        </td>

        <td className="p-2 text-center">
          {!isEditing && (
            <Button size="sm" variant="secondary" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </td>
      </tr>
    )
  }
)
