'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

export interface BookingData {
    fullName: string;
    nik: string;
    whatsapp: string;
    email: string;
    birthdate: string;
    address: string;
    service: string;
    serviceType: 'short' | 'long' | 'sisipan' | '';
    selectedDate: string; // Formatted date for display
    rawSelectedDate: string; // YYYY-MM-DD format for backend
    selectedTime: string;
    isWhatsappVerified: boolean;
    isNikChecked: boolean;
}

interface BookingContextType {
    bookingData: BookingData;
    setBookingData: (data: Partial<BookingData>) => void;
    resetBookingData: () => void;
}

const defaultBookingData: BookingData = {
    fullName: '',
    nik: '',
    whatsapp: '',
    email: '',
    birthdate: '',
    address: '',
    service: '',
    serviceType: '',
    selectedDate: '',
    rawSelectedDate: '',
    selectedTime: '',
    isWhatsappVerified: false,
    isNikChecked: false,
};

const STORAGE_KEY = 'bookingData';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * Get initial booking data from sessionStorage or return default
 */
function getInitialBookingData(): BookingData {
    if (typeof window === 'undefined') {
        return defaultBookingData;
    }

    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as BookingData;
        }
    } catch (error) {
        console.error('Error reading booking data from storage:', error);
    }

    return defaultBookingData;
}

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bookingData, setBookingDataState] = useState<BookingData>(
        getInitialBookingData,
    );

    // Sync to sessionStorage whenever bookingData changes
    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
        } catch (error) {
            console.error('Error saving booking data to storage:', error);
        }
    }, [bookingData]);

    const setBookingData = (data: Partial<BookingData>) => {
        setBookingDataState((prev) => {
            // Reset verification if phone number changes
            if (
                data.whatsapp !== undefined &&
                data.whatsapp !== prev.whatsapp
            ) {
                return { ...prev, ...data, isWhatsappVerified: false };
            }
            return { ...prev, ...data };
        });
    };

    const resetBookingData = () => {
        setBookingDataState(defaultBookingData);
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error removing booking data from storage:', error);
        }
    };

    return (
        <BookingContext.Provider
            value={{ bookingData, setBookingData, resetBookingData }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
