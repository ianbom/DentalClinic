export interface Patient {
    id: string;
    name: string;
    nik: string;
    gender: "Male" | "Female";
    age: number;
    phone: string;
    whatsapp: string;
    totalVisits: number;
    initials: string;
    colorBg: string; // e.g., bg-blue-100
    colorText: string; // e.g., text-primary
}

export const patientsData: Patient[] = [
    {
        id: "1",
        name: "Budi Santoso",
        nik: "32710101010001",
        gender: "Male",
        age: 34,
        phone: "0812-3456-7890",
        whatsapp: "6281234567890",
        totalVisits: 5,
        initials: "BS",
        colorBg: "bg-blue-100",
        colorText: "text-primary",
    },
    {
        id: "2",
        name: "Siti Aminah",
        nik: "32710101010002",
        gender: "Female",
        age: 28,
        phone: "0813-9876-5432",
        whatsapp: "6281398765432",
        totalVisits: 1,
        initials: "SA",
        colorBg: "bg-pink-100",
        colorText: "text-pink-600",
    },
    {
        id: "3",
        name: "Andi Wijaya",
        nik: "32710101010003",
        gender: "Male",
        age: 45,
        phone: "0811-1222-3333",
        whatsapp: "6281112223333",
        totalVisits: 12,
        initials: "AW",
        colorBg: "bg-purple-100",
        colorText: "text-purple-600",
    },
    {
        id: "4",
        name: "Dewi Sartika",
        nik: "32710101010004",
        gender: "Female",
        age: 31,
        phone: "0815-5555-6666",
        whatsapp: "6281555556666",
        totalVisits: 3,
        initials: "DS",
        colorBg: "bg-teal-100",
        colorText: "text-teal-600",
    },
    {
        id: "5",
        name: "Rina Wati",
        nik: "32710101010005",
        gender: "Female",
        age: 22,
        phone: "0819-9988-7766",
        whatsapp: "6281999887766",
        totalVisits: 8,
        initials: "RW",
        colorBg: "bg-orange-100",
        colorText: "text-orange-600",
    },
];
