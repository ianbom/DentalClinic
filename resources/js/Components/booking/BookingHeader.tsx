import { Link } from '@inertiajs/react';

interface BookingHeaderProps {
    currentStep?: number;
    doctorId?: string;
}

export function BookingHeader({
    currentStep = 1,
    doctorId,
}: BookingHeaderProps) {
    const steps = [
        {
            num: 1,
            label: 'Jadwal',
            href: doctorId ? `/doctors/${doctorId}/booking` : '#',
        },
        {
            num: 2,
            label: 'Data Diri',
            href: doctorId ? `/doctors/${doctorId}/booking/patient-data` : '#',
        },
        {
            num: 3,
            label: 'Review',
            href: doctorId
                ? `/doctors/${doctorId}/booking/patient-data/review`
                : '#',
        },
        { num: 4, label: 'Bayar', href: '#' },
    ];

    // Calculate progress line width percentage (0%, 33%, 66%, 100%)
    const progressWidth =
        currentStep > 1 ? `${((currentStep - 1) / 3) * 100}%` : '0%';

    return (
        <div className="w-full px-2">
            <div className="relative flex w-full items-center justify-between">
                {/* Background line (gray) */}
                <div className="absolute left-0 top-1/2 z-0 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200"></div>

                {/* Progress line (primary color) */}
                <div
                    className="absolute left-0 top-1/2 z-0 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
                    style={{ width: progressWidth }}
                ></div>

                {/* Step circles */}
                {steps.map((step) => {
                    const isCompleted = step.num < currentStep;
                    const isActive = step.num === currentStep;
                    const isUpcoming = step.num > currentStep;
                    const isClickable = isCompleted && doctorId;

                    const StepContent = (
                        <div className="relative z-10 flex flex-col items-center gap-2">
                            {/* Circle */}
                            <div
                                className={`flex size-8 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-all ${
                                    isCompleted
                                        ? 'bg-primary text-white ring-4 ring-background-light group-hover:ring-primary/10'
                                        : isActive
                                          ? 'bg-primary text-white ring-4 ring-primary/20'
                                          : 'border-2 border-gray-300 bg-white text-gray-400 ring-4 ring-background-light group-hover:border-primary/50 group-hover:text-primary/50'
                                }`}
                            >
                                {isCompleted ? (
                                    <span className="material-symbols-outlined text-base">
                                        check
                                    </span>
                                ) : (
                                    step.num
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={`absolute -bottom-6 w-20 text-center text-[10px] font-medium sm:text-xs ${
                                    isActive
                                        ? 'font-bold text-primary'
                                        : isCompleted
                                          ? 'text-primary'
                                          : 'text-gray-400 group-hover:text-primary/50'
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>
                    );

                    if (isClickable) {
                        return (
                            <Link
                                key={step.num}
                                href={step.href}
                                className="group flex cursor-pointer flex-col items-center gap-2 focus:outline-none"
                            >
                                {StepContent}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={step.num}
                            type="button"
                            className={`group flex flex-col items-center gap-2 focus:outline-none ${
                                isUpcoming ? 'cursor-default' : 'cursor-pointer'
                            }`}
                            disabled={isUpcoming}
                        >
                            {StepContent}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
