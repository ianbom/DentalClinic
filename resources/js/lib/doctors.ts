import doctorsData from "@/data/doctors.json";

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    days: string;
    practiceHours: string;
    price: string;
    profile: string;
    education: string;
    experience: string;
    badge: {
        text: string;
        colorClass: string;
        dotClass?: string;
    };
}

export function getDoctors(): Doctor[] {
    return doctorsData as Doctor[];
}

export function getDoctorById(id: string | number): Doctor | undefined {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    return doctorsData.find((doctor) => doctor.id === numericId) as Doctor | undefined;
}

export function getDoctorIds(): string[] {
    return doctorsData.map((doctor) => String(doctor.id));
}
