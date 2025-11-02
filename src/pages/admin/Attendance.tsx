import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

const Attendance = () => {
  const employees = ["Ravi Kumar", "Anita Sharma", "Kiran Patel", "Vijay Rao", "Leela Prasad"]

  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = new Date()

  // Edit mode toggle
  const [editMode, setEditMode] = useState(false)

  // Days in current month
  const days = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }, [currentDate])

  // Attendance data state
  const [attendanceData, setAttendanceData] = useState(
    employees.map(() => days.map(() => Math.random() > 0.2))
  )

  // Format header month/year
  const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  // Month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
    resetMonth(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    if (
      newDate.getMonth() <= today.getMonth() &&
      newDate.getFullYear() <= today.getFullYear()
    ) {
      setCurrentDate(newDate)
      resetMonth(newDate)
    }
  }

  // Regenerate dummy data when changing month
  const resetMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    setAttendanceData(employees.map(() => Array(daysInMonth).fill(false)))
  }

  // Disable forward navigation for future months
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()

  // Toggle attendance
  const toggleAttendance = (empIndex: number, dayIndex: number) => {
    if (!editMode) return // only allow in edit mode

    const dateToCheck = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayIndex + 1
    )
    // prevent marking future dates
    if (dateToCheck > today) return

    setAttendanceData((prev) =>
      prev.map((row, i) =>
        i === empIndex
          ? row.map((val, j) => (j === dayIndex ? !val : val))
          : row
      )
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground pt-24">
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-4xl font-bold text-foreground">Attendance Tracker</h1>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handlePrevMonth}
                  title="Previous Month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <p className="text-lg font-medium text-muted-foreground min-w-[150px] text-center">
                  {monthYear}
                </p>

                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleNextMonth}
                  title="Next Month"
                  disabled={isCurrentMonth}
                  className={isCurrentMonth ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <Button
                  variant={editMode ? "default" : "secondary"}
                  onClick={() => setEditMode((v) => !v)}
                  className="ml-2"
                  title="Toggle Edit Mode"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  {editMode ? "Save" : "Edit"}
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-border shadow-[var(--shadow-card)]">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-3 text-left font-semibold sticky left-0 bg-secondary z-10">
                      Employee
                    </th>
                    {days.map((day) => (
                      <th key={day} className="p-2 text-center font-medium">
                        {day}
                      </th>
                    ))}
                    <th className="p-3 text-center font-semibold bg-secondary">Summary</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((emp, empIndex) => {
                    const presentCount = attendanceData[empIndex].filter(Boolean).length
                    const absentCount = days.length - presentCount

                    return (
                      <tr
                        key={emp}
                        className="even:bg-muted/40 hover:bg-primary/10 transition-colors"
                      >
                        <td className="p-3 font-medium sticky left-0 bg-background z-10">
                          {emp}
                        </td>

                        {attendanceData[empIndex].map((isPresent, dayIndex) => {
                          const dateObj = new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            dayIndex + 1
                          )
                          const isFuture = dateObj > today

                          return (
                            <td
                              key={dayIndex}
                              className={`p-2 text-center ${
                                editMode && !isFuture ? "cursor-pointer" : ""
                              }`}
                              onClick={() =>
                                !isFuture && toggleAttendance(empIndex, dayIndex)
                              }
                            >
                              {!isFuture ? (
                                <span
                                  className={`inline-block w-3 h-3 rounded-full ${
                                    isPresent ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></span>
                              ) : (
                                <span className="inline-block w-3 h-3 rounded-full bg-muted-foreground/20"></span>
                              )}
                            </td>
                          )
                        })}

                        <td className="p-3 text-center font-semibold text-sm">
                          <span className="text-green-500">W-{presentCount}</span>{" "}
                          <span className="text-red-500">NW-{absentCount}</span>
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

export default Attendance
