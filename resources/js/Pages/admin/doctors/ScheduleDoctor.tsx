import {
    CalendarGrid,
    DaySlotInfo,
    SlotStatus,
} from '@/Components/admin/schedule/CalendarGrid';
import { CalendarHeader } from '@/Components/admin/schedule/CalendarHeader';
import { CalendarLegend } from '@/Components/admin/schedule/CalendarLegend';
import {
    ScheduleSidebar,
    TimeSlotInfo,
} from '@/Components/admin/schedule/ScheduleSidebar';
import AdminLayout from '@/Layouts/AdminLayout';
import { Doctor } from '@/types';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface WorkingPeriod {
    id: number;
    doctor_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface DoctorWithPeriods extends Doctor {
    working_periods: WorkingPeriod[];
}

interface SlotInfo {
    time: string;
    available: boolean;
    reason: string | null;
    slot_type: 'long' | 'short';
    available_for_short: boolean;
    available_for_long: boolean;
    patient_name?: string;
    service?: string;
    booking_id?: number;
}

interface DayAvailability {
    date: string;
    day_name: string;
    formatted_date: string;
    slots: SlotInfo[];
}

interface ScheduleDoctorProps {
    doctor: DoctorWithPeriods;
    availableSlots: Record<string, DayAvailability>;
    allDoctors: Doctor[];
}

// Helper function to get month name
function getMonthName(month: number): string {
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];
    return months[month];
}

// Get day of week name in Indonesian
function getDayName(dayOfWeek: number): string {
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ];
    return days[dayOfWeek];
}

// Check if doctor works on a specific day of week
function doctorWorksOnDay(
    workingPeriods: WorkingPeriod[],
    dayName: string,
): boolean {
    return workingPeriods.some(
        (period) => period.day_of_week === dayName && period.is_active,
    );
}

export default function ScheduleDoctor({
    doctor,
    availableSlots,
    allDoctors,
}: ScheduleDoctorProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDateNum, setSelectedDateNum] = useState<number | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Generate calendar days based on availableSlots from backend
    const calendarDays = useMemo(() => {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const today = new Date();
        const isCurrentMonthView =
            today.getFullYear() === year && today.getMonth() === month;

        const days: DaySlotInfo[] = [];

        // Previous month padding
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            days.push({
                date: prevMonthLastDay - i,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                status: 'no_schedule' as SlotStatus,
                availableCount: 0,
                totalSlots: 0,
            });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayData = availableSlots[dateStr];
            const dateObj = new Date(year, month, day);
            const dayName = getDayName(dateObj.getDay());
            const worksOnDay = doctorWorksOnDay(
                doctor.working_periods || [],
                dayName,
            );

            let status: SlotStatus = 'no_schedule';
            let availableCount = 0;
            let totalSlots = 0;

            if (dayData) {
                totalSlots = dayData.slots.length;
                availableCount = dayData.slots.filter(
                    (s) => s.available,
                ).length;

                if (totalSlots === 0) {
                    status = 'no_schedule';
                } else if (availableCount === 0) {
                    status = 'full';
                } else {
                    status = 'available';
                }
            } else if (worksOnDay) {
                // Doctor works but no slots data (past date or beyond 30 days)
                const isPast =
                    dateObj < new Date(new Date().setHours(0, 0, 0, 0));
                status = isPast ? 'no_schedule' : 'off';
            }

            days.push({
                date: day,
                isCurrentMonth: true,
                isToday: isCurrentMonthView && today.getDate() === day,
                isSelected: selectedDateNum === day,
                status,
                availableCount,
                totalSlots,
            });
        }

        // Next month padding (fill to 42 for 6 rows)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: i,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                status: 'no_schedule' as SlotStatus,
                availableCount: 0,
                totalSlots: 0,
            });
        }

        return days;
    }, [year, month, selectedDateNum, availableSlots, doctor.working_periods]);

    // Get time slots for selected date
    const selectedSlots = useMemo(() => {
        if (!selectedDateNum) return { morning: [], afternoon: [] };

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDateNum).padStart(2, '0')}`;
        const dayData = availableSlots[dateStr];

        if (!dayData) return { morning: [], afternoon: [] };

        const morning: TimeSlotInfo[] = [];
        const afternoon: TimeSlotInfo[] = [];

        for (const slot of dayData.slots) {
            const [hourStr, minuteStr] = slot.time.split(':');
            const hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            // Calculate end time
            const startTime = new Date();
            startTime.setHours(hour, minute, 0, 0);
            const endTime = new Date(startTime);
            endTime.setMinutes(minute + (slot.slot_type === 'long' ? 45 : 15));
            const endTimeStr = endTime.toTimeString().slice(0, 5);

            // Determine status
            let status: 'available' | 'booked' | 'off' | 'unavailable' =
                'unavailable';
            if (slot.available) {
                status = 'available';
            } else if (slot.reason === 'time_off') {
                status = 'off';
            } else if (slot.reason === 'booked') {
                status = 'booked';
            } else {
                status = 'unavailable';
            }

            const timeSlot: TimeSlotInfo = {
                time: slot.time,
                endTime: endTimeStr,
                status: status,
                patientName: slot.patient_name,
                service: slot.service,
                bookingId: slot.booking_id,
            };

            if (hour < 12) {
                morning.push(timeSlot);
            } else {
                afternoon.push(timeSlot);
            }
        }

        return { morning, afternoon };
    }, [selectedDateNum, year, month, availableSlots]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
        setSelectedDateNum(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
        setSelectedDateNum(null);
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentDate(today);
        setSelectedDateNum(today.getDate());
    };

    const handleDoctorChange = (doctorId: number | null) => {
        if (doctorId) {
            router.get(
                `/admin/schedule/${doctorId}`,
                {},
                { preserveState: false },
            );
        }
    };

    const handleSelectDate = (dateNum: number) => {
        setSelectedDateNum(dateNum);
    };

    const selectedFullDate = selectedDateNum
        ? new Date(year, month, selectedDateNum)
        : null;

    // Calculate stats for selected day
    const selectedDateStr = selectedDateNum
        ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDateNum).padStart(2, '0')}`
        : null;
    const selectedDayData = selectedDateStr
        ? availableSlots[selectedDateStr]
        : null;
    const totalSlots = selectedDayData?.slots.length || 0;
    const availableCount =
        selectedDayData?.slots.filter((s) => s.available).length || 0;
    const bookedCount = totalSlots - availableCount;

    return (
        <div className="flex h-full flex-col gap-6 bg-[#f8fbfc] md:flex-row">
            {/* Calendar Section */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                <CalendarHeader
                    currentMonth={getMonthName(month)}
                    currentYear={year}
                    selectedDoctor={doctor}
                    doctors={allDoctors}
                    onDoctorChange={handleDoctorChange}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                    onToday={handleToday}
                />

                <CalendarGrid
                    days={calendarDays}
                    onSelectDate={handleSelectDate}
                />

                <CalendarLegend />
            </div>

            {/* Sidebar */}
            {selectedDateNum && (
                <ScheduleSidebar
                    selectedDate={selectedFullDate}
                    totalSlots={totalSlots}
                    availableSlots={availableCount}
                    bookedSlots={bookedCount}
                    morningSlots={selectedSlots.morning}
                    afternoonSlots={selectedSlots.afternoon}
                    doctorId={doctor.id}
                    onClose={() => setSelectedDateNum(null)}
                />
            )}
        </div>
    );
}

ScheduleDoctor.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);
