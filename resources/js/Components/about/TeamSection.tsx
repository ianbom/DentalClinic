interface TeamMemberProps {
    name: string;
    // specialty: string;
    image: string;
    experience: string;
}

function TeamMemberCard({
    name,
    // specialty,
    image,
    experience,
}: TeamMemberProps) {
    return (
        <div className="group flex flex-col">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
                <img
                    alt={`Portrait of ${name}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={image}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">
                        {experience}
                    </span>
                </div>
            </div>
            <h3 className="text-lg font-bold text-text-light">{name}</h3>
            {/* <p className="text-sm font-medium text-primary">{specialty}</p> */}
        </div>
    );
}

import { Doctor } from '@/types';

interface TeamSectionProps {
    doctors: Doctor[];
}

export function TeamSection({ doctors }: TeamSectionProps) {
    return (
        <section className="flex justify-center bg-white px-4 py-16 md:px-40">
            <div className="flex max-w-[1100px] flex-1 flex-col">
                <div className="mb-10 flex flex-col gap-2 text-center">
                    <h2 className="text-3xl font-bold leading-tight text-text-light">
                        Tim Dokter Kami
                    </h2>
                    <p className="text-gray-500">
                        Ditangani langsung oleh para ahli berpengalaman di
                        bidangnya.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doctor) => (
                        <TeamMemberCard
                            key={doctor.id}
                            name={doctor.name}
                            // specialty={doctor.sip || 'Dokter Gigi'}
                            image={
                                doctor.profile_pic
                                    ? `${doctor.profile_pic}`
                                    : 'https://placehold.co/400x600?text=No+Image'
                            }
                            experience={`${doctor.experience} Tahun Pengalaman`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
