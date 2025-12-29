interface TeamMemberProps {
    name: string;
    specialty: string;
    image: string;
    experience: string;
}

function TeamMemberCard({
    name,
    specialty,
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
            <p className="text-sm font-medium text-primary">{specialty}</p>
        </div>
    );
}

const teamMembers: TeamMemberProps[] = [
    {
        name: 'drg. Budi Santoso',
        specialty: 'Dokter Gigi Umum',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXoCB764Wi7C50I30N9CUjaQbmM9a_2RmnCGVzkOZXkjiIvwA5lywNEhPHKCYj7ar-iodGiIDHE5S0wjPqe7VufDb_vi1dm9BTs7yB2N_F4IGjJqAm7V37Rn4a1FRu7QUFmaF64j-P3acx9jVxnGlBvtwJJGEnexB7FPzwUvn9Zp5zBQUGuIaF6Ov6tPWvG8E1mkAo5RrEHxs0dsh_adUMWPYpaX5HQq5epgTThTBwIRomWN2OusqTwsfCWgRNaBJLtlZ300MmXjBT',
        experience: '12 Tahun Pengalaman',
    },
    {
        name: 'drg. Siti Aminah, Sp.Ort',
        specialty: 'Orthodontist',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRB83mfZmelZROVhPCd3k5aRNmx11O1BhwSzylk_jlTLtTCQ1JkiXFIcozLWJK4MXvh8BvFr6mvBpjKm-Sa5vWPhvxKvl_OZCp1L8Rjrv1ekwcwqWUy67XaLePokalxLncOEdI7I422azSp49fCHYvabBOh--PlARRG2ispB5YllddUS4KW09OFqCJh1M8rM2fSfkYCwSI6WkgPhB9Hq9Y_o7xjeD_eEsJRk_SfJ3LEd6Vsjpj0g7sVcV_bFzaByeFyuc5Ztju7Una',
        experience: 'Spesialis Kawat Gigi',
    },
    {
        name: 'drg. Andi Pratama, Sp.BM',
        specialty: 'Bedah Mulut',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgSJ31FX1SpjH6hD6V3Y7iaUR2JDPnIUUFZcEqHt8D8N_FXrcOT24fO5MbSXONHwq7wYPju6yahAd3sc5C2VYUlp5CWBDKqt0Xj4PeT2EiLD5E6CmN80Viv0WNYTM3k1WbSrNJ8vbsMQeidp9tcbNnPXM9lHM5-0eRvsFLYioWI1rJ9loTmYSgr5y73_N1UagsMBhRopkmzYnbgOZ7ND_txlSr_AxvPCvDqZ8rD7eGF8brRFHi0hVNZXtYOyzRwPanOIIA3Zwlg5Uj',
        experience: 'Ahli Bedah Mulut',
    },
    {
        name: 'drg. Ratna Dewi, Sp.KGA',
        specialty: 'Dokter Gigi Anak',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaMMFee9xEOxXNFTSvjtyP3Omi0f1xm5Pk6LxCsbz_GRco5E3hcquy4yqmI3dHe_Vzc3IUBkh4oM2kikNrf5shZfkqMTuW-JhypWTrOWFsBfCD3q3Q0AGtak7tDuR6mk8A4bqfARmlT0uzvpT2l9-ip6fVLSN2WSGTdTUD4GNqSzJH1g5kHegYsN-DOKpfcA5QOUi81aexMQBTzTrZtYe8SQhNOa-5uWQSJEYYSGOe4wQaUBpToIkZYwhCdH2w8hMIn55miE0zs2P7',
        experience: 'Spesialis Anak',
    },
];

export function TeamSection() {
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
    );
}
