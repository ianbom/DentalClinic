export interface BookingData {
    id: string;
    code: string;
    createdDate: string;
    status: "Confirmed" | "Checked-in" | "Pending" | "Completed" | "Cancelled";
    doctor: {
        name: string;
        initials: string;
        speciality: string;
        colorBg: string;
        colorText: string;
        image: string;
    };
    schedule: {
        date: string;
        time: string;
    };
    patient: {
        name: string;
        type: string;
        phone: string;
        nik: string;
        email: string;
        notes: string;
        image: string;
    };
}

export const bookingsData: BookingData[] = [
    {
        id: "1",
        code: "BK-001",
        createdDate: "20 Okt 2023, 08:30 WIB",
        status: "Confirmed",
        doctor: {
            name: "Drg. Siti Aminah",
            initials: "SA",
            speciality: "Spesialis Orthodonti",
            colorBg: "bg-blue-100",
            colorText: "text-primary",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBHr8bxUmkkeKBVki_5R_Z0OVoS24I_IXtcNj7UuPg7UcnYtTxKV9x3Gu6eg9Epm1fHl-kAxVKPM6MXwt2qhKVw7EQ3U_wNmOGM4LKL5A_khMARDnidFc9R-POisiahD67qY1qA_5NCBghlLWiRcJ_nKmdaAnoOY8HzHg1bY2d8sKVBdRtGJVCSykqir6lou6p5y-OvUkQrJ__VnUU_LTdr7vP6-XlPzbieYxi8kXUxTFHQKGrQ0gBhvEiMiE1BZ2Ls7NrnJG539WeS",
        },
        schedule: {
            date: "12 Oct 2023",
            time: "14:00 - 15:00",
        },
        patient: {
            name: "Budi Santoso",
            type: "Pasien Umum",
            phone: "+62 812-3456-789",
            nik: "3201234567890001",
            email: "budi.santoso@email.com",
            notes: "Mohon konfirmasi jika ada perubahan jadwal.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAsFtZ8NDv9DtBbYNw4bVsFGzaCaYdl1BDGBtrWzPMRN41EYBQwa0K7eS7SLTYGeLDWMjVeDKurUf5f46jSDHw7Nx_lMfSZNA_sxdFRuLMPtWJB0w8kHAj8NY1m6jJD7RudqwC1eYigaiI0baDFEt9lWVSIcHEt48w_gn2UFr3O8w_1MCrC1-AyO3DJplVilYW4go9hnUMl0hWXjTvWqusMFK9ix0NJKZDYLieFXwtLLsKYtAq-zH4UtoMe_h0hhowIgmjcbis-MpPq",
        },
    },
    {
        id: "2",
        code: "BK-002",
        createdDate: "20 Okt 2023, 09:00 WIB",
        status: "Checked-in",
        doctor: {
            name: "Drg. Budi Hartono",
            initials: "BH",
            speciality: "Dokter Gigi Umum",
            colorBg: "bg-orange-100",
            colorText: "text-orange-600",
            image: "",
        },
        schedule: {
            date: "12 Oct 2023",
            time: "15:00 - 16:00",
        },
        patient: {
            name: "Rina Wati",
            type: "Pasien BPJS",
            phone: "+62 819-8765-432",
            nik: "3201234567890002",
            email: "rina.wati@email.com",
            notes: "",
            image: "",
        },
    },
    {
        id: "3",
        code: "BK-003",
        createdDate: "21 Okt 2023, 10:00 WIB",
        status: "Pending",
        doctor: {
            name: "Drg. Siti Aminah",
            initials: "SA",
            speciality: "Spesialis Orthodonti",
            colorBg: "bg-blue-100",
            colorText: "text-primary",
            image: "",
        },
        schedule: {
            date: "13 Oct 2023",
            time: "09:00 - 10:00",
        },
        patient: {
            name: "Andi Saputra",
            type: "Pasien Umum",
            phone: "+62 813-4567-890",
            nik: "3201234567890003",
            email: "andi.saputra@email.com",
            notes: "",
            image: "",
        },
    },
    {
        id: "4",
        code: "BK-004",
        createdDate: "21 Okt 2023, 11:00 WIB",
        status: "Completed",
        doctor: {
            name: "Drg. Citra Kirana",
            initials: "CK",
            speciality: "Spesialis Bedah Mulut",
            colorBg: "bg-pink-100",
            colorText: "text-pink-600",
            image: "",
        },
        schedule: {
            date: "13 Oct 2023",
            time: "10:00 - 11:00",
        },
        patient: {
            name: "Dewi Lestari",
            type: "Pasien Umum",
            phone: "+62 815-6789-012",
            nik: "3201234567890004",
            email: "dewi.lestari@email.com",
            notes: "",
            image: "",
        },
    },
    {
        id: "5",
        code: "BK-005",
        createdDate: "22 Okt 2023, 08:00 WIB",
        status: "Cancelled",
        doctor: {
            name: "Drg. Budi Hartono",
            initials: "BH",
            speciality: "Dokter Gigi Umum",
            colorBg: "bg-orange-100",
            colorText: "text-orange-600",
            image: "",
        },
        schedule: {
            date: "14 Oct 2023",
            time: "13:00 - 14:00",
        },
        patient: {
            name: "Eko Prasetyo",
            type: "Pasien BPJS",
            phone: "+62 817-8901-234",
            nik: "3201234567890005",
            email: "eko.prasetyo@email.com",
            notes: "",
            image: "",
        },
    },
];

export function getBookingById(id: string): BookingData | undefined {
    return bookingsData.find((booking) => booking.id === id);
}
