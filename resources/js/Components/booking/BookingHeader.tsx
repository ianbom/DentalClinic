interface BookingHeaderProps {
    currentStep?: number;
}

export function BookingHeader({ currentStep = 1 }: BookingHeaderProps) {
    const stepLabels = ['Pilih Jadwal', 'Data Diri', 'Review', 'Selesai'];
    const totalSteps = 4;

    const getTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Pilih Jadwal Konsultasi';
            case 2:
                return 'Isi Data Diri';
            case 3:
                return 'Review Booking';
            case 4:
                return 'Booking Selesai';
            default:
                return 'Booking';
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col gap-3">
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight text-text-light">
                            {getTitle()}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Langkah {currentStep} dari {totalSteps}
                        </p>
                    </div>
                    <div className="hidden gap-4 text-sm font-medium text-gray-400 sm:flex">
                        {stepLabels.map((label, index) => {
                            const stepNum = index + 1;
                            const isActive = stepNum === currentStep;
                            const isCompleted = stepNum < currentStep;

                            return (
                                <span
                                    key={stepNum}
                                    className={
                                        isActive
                                            ? 'font-bold text-primary'
                                            : isCompleted
                                              ? 'text-primary'
                                              : ''
                                    }
                                >
                                    {stepNum}. {label}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                        style={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
