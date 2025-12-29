interface BookingHeaderProps {
    currentStep?: number;
}

export function BookingHeader({ currentStep = 1 }: BookingHeaderProps) {
    const stepLabels = ["Pilih Jadwal", "Data Diri", "Review", "Selesai"];
    const totalSteps = 4;

    const getTitle = () => {
        switch (currentStep) {
            case 1: return "Pilih Jadwal Konsultasi";
            case 2: return "Isi Data Diri";
            case 3: return "Review Booking";
            case 4: return "Booking Selesai";
            default: return "Booking";
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-text-light tracking-tight">
                            {getTitle()}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Langkah {currentStep} dari {totalSteps}</p>
                    </div>
                    <div className="hidden sm:flex gap-4 text-sm font-medium text-gray-400">
                        {stepLabels.map((label, index) => {
                            const stepNum = index + 1;
                            const isActive = stepNum === currentStep;
                            const isCompleted = stepNum < currentStep;

                            return (
                                <span key={stepNum} className={isActive ? "text-primary font-bold" : isCompleted ? "text-primary" : ""}>
                                    {stepNum}. {label}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
