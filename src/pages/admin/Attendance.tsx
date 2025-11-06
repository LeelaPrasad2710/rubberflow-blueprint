import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Pencil, Save, CheckCircle } from "lucide-react";

interface AttendanceRecord {
  id?: number;
  employeeId: number;
  employeeName: string;
  date: string;
  present: boolean;
  otHours: number;
  isHoliday?: boolean;
}

const Attendance = () => {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showOtInput, setShowOtInput] = useState<{ empId: number | null; day: number | null }>({
    empId: null,
    day: null,
  });
  const [otValue, setOtValue] = useState(0);
  const [holidays, setHolidays] = useState<number[]>([]);

  const [currentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear] = useState(new Date().getFullYear());
  const [today] = useState(new Date().getDate());
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const fetchAttendance = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/attendance/setup/${currentYear}/${currentMonth}`
      );
      const data = await res.json();
      setAttendance(data);
    } catch (err) {
      console.error("❌ Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const toggleDay = (empId: number, day: number) => {
    if (!editMode) return;
    const dateObj = new Date(currentYear, currentMonth - 1, day);
    const isFuture = day > today;
    const isSunday = dateObj.getDay() === 0;
    const isHoliday = holidays.includes(day);

    if (isFuture || isSunday || isHoliday) return;
    setAttendance((prev) =>
      prev.map((rec) => {
        const date = new Date(rec.date).getDate();
        return rec.employeeId === empId && date === day
          ? { ...rec, present: !rec.present, otHours: rec.present ? 0 : rec.otHours }
          : rec;
      })
    );
  };

  const openOtInput = (empId: number, day: number, currentOt: number) => {
    if (!editMode) return;
    const isFuture = day > today;
    if (isFuture) return;
    setShowOtInput({ empId, day });
    setOtValue(currentOt || 0);
  };

  const saveOtHours = () => {
    const { empId, day } = showOtInput;
    if (empId && day) {
      setAttendance((prev) =>
        prev.map((rec) => {
          const date = new Date(rec.date).getDate();
          return rec.employeeId === empId && date === day ? { ...rec, otHours: otValue } : rec;
        })
      );
    }
    setShowOtInput({ empId: null, day: null });
  };

  const markAllPresentForToday = () => {
    if (!editMode) {
      alert("Enable Edit mode to mark attendance");
      return;
    }
    const currentDay = new Date(currentYear, currentMonth - 1, today);
    if (currentDay.getDay() === 0) {
      alert("Sunday — only OT allowed, not attendance.");
      return;
    }
    if (holidays.includes(today)) {
      alert("Today is marked as a holiday — attendance disabled.");
      return;
    }
    setAttendance((prev) =>
      prev.map((rec) => {
        const date = new Date(rec.date).getDate();
        return date === today ? { ...rec, present: true } : rec;
      })
    );
  };

  const toggleHoliday = (day: number) => {
    if (!editMode) return;
    setHolidays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/attendance/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendance),
      });

      if (res.ok) {
        alert("✅ Attendance saved successfully!");
        setEditMode(false);
        fetchAttendance();
      } else {
        alert("❌ Failed to save attendance");
      }
    } catch (err) {
      console.error("❌ Error saving attendance:", err);
    }
  };

  const employees = [...new Set(attendance.map((a) => a.employeeName))];

  const getRecord = (emp: string, day: number) => {
    return attendance.find(
      (a) => a.employeeName === emp && new Date(a.date).getDate() === day
    );
  };

  // ✅ Updated summary: exclude Sundays & Holidays for W/NW
  const getSummary = (emp: string) => {
    const records = attendance.filter((a) => a.employeeName === emp);
    const validRecords = records.filter((r) => new Date(r.date).getDate() <= today);

    const worked = validRecords.filter((r) => {
      const day = new Date(r.date).getDate();
      const dateObj = new Date(currentYear, currentMonth - 1, day);
      const isSunday = dateObj.getDay() === 0;
      return r.present && !isSunday && !holidays.includes(day);
    }).length;

    const notWorked = validRecords.filter((r) => {
      const day = new Date(r.date).getDate();
      const dateObj = new Date(currentYear, currentMonth - 1, day);
      const isSunday = dateObj.getDay() === 0;
      return !r.present && !holidays.includes(day) && !isSunday;
    }).length;

    const ot = validRecords.reduce((sum, r) => sum + r.otHours, 0);
    return { worked, notWorked, ot };
  };

  const isSunday = (day: number) => {
    const d = new Date(currentYear, currentMonth - 1, day);
    return d.getDay() === 0;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background text-foreground pt-24">
        <section className="py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-foreground mb-3">Attendance Tracker</h1>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 border rounded-lg p-2 mb-3 bg-gray-50 text-xs">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-400 rounded"></span>Present</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-400 rounded"></span>Absent</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-300 rounded"></span>OT Hours</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-yellow-200 rounded"></span>Sunday</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-rose-200 rounded"></span>Holiday</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-200 rounded"></span>Future (–)</div>
            </div>

            {/* 💡 Tip + Buttons together */}
            <div className="flex flex-wrap justify-between items-center mb-3">
              <p className="text-xs text-muted-foreground">
                💡 <b>Tip:</b> Double-click to add OT hours. Click a date header to toggle Holiday.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={markAllPresentForToday}
                  variant="outline"
                  className="flex items-center gap-2 text-xs px-3 py-1"
                >
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Mark All Present
                </Button>
                <Button
                  onClick={() => (editMode ? handleSave() : setEditMode(true))}
                  className="flex items-center gap-2 text-xs px-3 py-1"
                >
                  {editMode ? <Save className="h-3 w-3" /> : <Pencil className="h-3 w-3" />}
                  {editMode ? "Save" : "Edit"}
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border shadow bg-white overflow-hidden">
              <table className="border-collapse text-[13px] text-center w-full table-fixed">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-2 w-[110px] text-left sticky left-0 bg-secondary">Employee</th>
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1;
                      const dateObj = new Date(currentYear, currentMonth - 1, day);
                      const isSun = dateObj.getDay() === 0;
                      const isHoliday = holidays.includes(day);
                      return (
                        <th
                          key={i}
                          onClick={() => toggleHoliday(day)}
                          className={`p-1 border cursor-pointer w-[25px] ${
                            isSun
                              ? "bg-yellow-100 hover:bg-yellow-200"
                              : isHoliday
                              ? "bg-rose-100 hover:bg-rose-200"
                              : ""
                          }`}
                        >
                          {day}
                        </th>
                      );
                    })}
                    <th className="p-2 border sticky right-0 bg-secondary w-[110px]">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, eIndex) => {
                    const summary = getSummary(emp);
                    return (
                      <tr key={eIndex} className={eIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="p-2 text-left font-medium sticky left-0 bg-inherit">{emp}</td>
                        {[...Array(daysInMonth)].map((_, i) => {
                          const day = i + 1;
                          const record = getRecord(emp, day);
                          const isFuture = day > today;
                          const sunday = isSunday(day);
                          const isHoliday = holidays.includes(day);
                          return (
                            <td
                              key={i}
                              className={`p-1 border ${
                                sunday
                                  ? "bg-yellow-50"
                                  : isHoliday
                                  ? "bg-rose-50"
                                  : isFuture
                                  ? "bg-gray-100 text-gray-400"
                                  : "hover:bg-primary/10"
                              }`}
                              onClick={() =>
                                !isFuture && !isHoliday && !sunday
                                  ? toggleDay(record?.employeeId ?? 0, day)
                                  : null
                              }
                              onDoubleClick={() =>
                                !isFuture &&
                                openOtInput(record?.employeeId ?? 0, day, record?.otHours ?? 0)
                              }
                            >
                              {record ? (
                                <div className="flex flex-col items-center">
                                  {!sunday && !isHoliday && !isFuture ? (
                                    <span
                                      className={
                                        record.present
                                          ? "text-green-600 font-bold"
                                          : "text-red-500 font-bold"
                                      }
                                    >
                                      {record.present ? "✓" : "×"}
                                    </span>
                                  ) : isFuture ? (
                                    "-"
                                  ) : null}
                                  {record.otHours > 0 && (
                                    <small className="text-blue-500 font-semibold text-[10px]">
                                      {record.otHours}h
                                    </small>
                                  )}
                                </div>
                              ) : (
                                "-"
                              )}
                            </td>
                          );
                        })}
                        <td className="p-1 border sticky right-0 bg-inherit text-[12px]">
                          <span className="text-green-600 font-bold mr-1">W-{summary.worked}</span>
                          <span className="text-red-500 font-bold mr-1">NW-{summary.notWorked}</span>
                          <span className="text-blue-600 font-bold">OT-{summary.ot}h</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* OT Input Popup */}
            {showOtInput.empId && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-72">
                  <h2 className="text-md font-bold mb-4 text-center">Enter OT Hours</h2>
                  <input
                    type="number"
                    className="border w-full p-2 rounded text-center"
                    value={otValue}
                    onChange={(e) => setOtValue(Number(e.target.value))}
                  />
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setShowOtInput({ empId: null, day: null })}
                    >
                      Cancel
                    </Button>
                    <Button onClick={saveOtHours}>Save</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Attendance;
