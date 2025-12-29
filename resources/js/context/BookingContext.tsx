"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface BookingData {
    fullName: string;
    nik: string;
    whatsapp: string;
    email: string;
    complaint: string;
    selectedDate: string;
    selectedTime: string;
}

interface BookingContextType {
    bookingData: BookingData;
    setBookingData: (data: Partial<BookingData>) => void;
    resetBookingData: () => void;
}

const defaultBookingData: BookingData = {
    fullName: "",
    nik: "",
    whatsapp: "",
    email: "",
    complaint: "",
    selectedDate: "",
    selectedTime: "",
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bookingData, setBookingDataState] = useState<BookingData>(defaultBookingData);

    const setBookingData = (data: Partial<BookingData>) => {
        setBookingDataState((prev) => ({ ...prev, ...data }));
    };

    const resetBookingData = () => {
        setBookingDataState(defaultBookingData);
    };

    return (
        <BookingContext.Provider value={{ bookingData, setBookingData, resetBookingData }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}
