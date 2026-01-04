// =============================================================================
// Base Types
// =============================================================================

export interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
}

// =============================================================================
// User & Auth
// =============================================================================

export type UserRole = 'admin' | 'staff';

export interface User extends BaseModel {
    name: string;
    email: string;
    email_verified_at?: string;
    role: UserRole;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// =============================================================================
// Doctor
// =============================================================================

export interface Doctor extends BaseModel {
    name: string;
    sip?: string;
    experience: number;
    profile_pic?: string;
    is_active: boolean;
    // Relations
    working_periods?: DoctorWorkingPeriod[];
    time_off?: DoctorTimeOff[];
    bookings?: Booking[];
}

export interface DoctorWorkingPeriod extends BaseModel {
    doctor_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    // Relations
    doctor?: Doctor;
}

export interface DoctorTimeOff extends BaseModel {
    doctor_id: number;
    date: string;
    start_time: string;
    end_time: string;
    note?: string;
    created_by_user_id?: number;
    // Relations
    doctor?: Doctor;
    created_by?: User;
}

// =============================================================================
// Booking - Core Types
// =============================================================================

export type BookingStatus =
    | 'confirmed'
    | 'checked_in'
    | 'cancelled'
    | 'no_show';

export interface Booking extends BaseModel {
    doctor_id: number;
    patient_id: number;
    code: string;
    service?: string;
    type?: 'long' | 'short';
    booking_date: string;
    start_time: string;
    status: BookingStatus;
    is_active: number;
    // Relations
    doctor?: Doctor;
    patient?: Patient;
    patient_detail?: Patient; // Alias for backward compatibility
    checkin?: BookingCheckin;
    cancellation?: BookingCancellation;
    reschedules?: BookingReschedule[];
    notifications?: Notification[];
}

export interface Patient extends BaseModel {
    medical_records?: string;
    patient_name: string;
    patient_nik: string;
    patient_email?: string;
    patient_phone: string;
    patient_birthdate?: string;
    patient_address?: string;
    // Relations
    bookings?: Booking[];
}

export interface BookingCheckin {
    booking_id: number;
    checked_in_at: string;
    created_at: string;
    updated_at: string;
    // Relations
    booking?: Booking;
}

export interface BookingCancellation {
    booking_id: number;
    cancelled_at: string;
    cancelled_by_user_id?: number;
    cancelled_by?: string;
    reason?: string;
    created_at: string;
    updated_at: string;
    // Relations
    booking?: Booking;
    cancelled_by_user?: User;
}

// =============================================================================
// Booking - Reschedule
// =============================================================================

export type RescheduleStatus =
    | 'pending_patient'
    | 'applied'
    | 'rejected'
    | 'expired';
export type RescheduleRequestedBy = 'patient' | 'staff';
export type PatientResponse = 'accepted' | 'rejected';

export interface BookingReschedule extends BaseModel {
    booking_id: number;
    requested_by: RescheduleRequestedBy;
    requested_by_user_id?: number;
    old_date: string;
    old_start_time: string;
    new_date: string;
    new_start_time: string;
    reason?: string;
    status: RescheduleStatus;
    patient_responded_at?: string;
    patient_response?: PatientResponse;
    response_note?: string;
    expires_at?: string;
    is_pending: number;
    // Relations
    booking?: Booking;
    requested_by_user?: User;
}

// =============================================================================
// Booking - Schedule & Slots
// =============================================================================

export type SlotUnavailableReason = 'time_off' | 'booked' | 'past';

export interface TimeSlot {
    time: string;
    available: boolean;
    reason?: SlotUnavailableReason | null;
    slot_type?: 'short' | 'long';
    available_for_short?: boolean;
    available_for_long?: boolean;
}

export interface AvailableDate {
    date: string;
    day_name: string;
    formatted_date: string;
    slots: TimeSlot[];
}

export type AvailableSlots = Record<string, AvailableDate>;

// =============================================================================
// Notifications
// =============================================================================

export type NotificationChannel = 'whatsapp' | 'email' | 'sms';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'cancelled';
export type NotificationType =
    | 'booking_confirmation'
    | 'reminder'
    | 'reschedule_request'
    | 'reschedule_applied'
    | 'cancellation';

export interface Notification extends BaseModel {
    booking_id: number;
    channel: NotificationChannel;
    type: NotificationType;
    recipient: string;
    payload?: string;
    scheduled_at?: string;
    sent_at?: string;
    status: NotificationStatus;
    attempt_count: number;
    last_error?: string;
    // Relations
    booking?: Booking;
}

// =============================================================================
// Dashboard & List Views (Flattened DTOs)
// =============================================================================

export interface DashboardStats {
    bookings_today: number;
    checkins_today: number;
    cancellations_today: number;
    reschedules_today: number;
}

/** Flattened booking item for simple table displays */
export interface BookingListItem {
    id: number;
    code: string;
    patient_name: string;
    patient_phone: string;
    doctor_name: string;
    booking_date: string;
    start_time: string;
    status: BookingStatus;
    created_at: string;
    patient_gender: string;
}

/** Extended booking item with additional formatted fields for detailed views */
export interface BookingFullItem extends BookingListItem {
    patient_nik: string;
    patient_email: string;
    patient_gender: string;
    patient_address: string;
    booking_date_formatted: string;
    service: string;
    created_at_formatted: string;
    payment?: {
        amount: number;
        payment_method: string;
        note: string;
    } | null;
}

/** Complete booking detail for admin detail page */
export interface BookingDetail {
    id: number;
    code: string;
    status: BookingStatus;
    booking_date: string;
    booking_date_formatted: string;
    start_time: string;
    created_at: string;
    created_at_formatted: string;
    service: string;
    patient: {
        name: string;
        nik: string;
        phone: string;
        gender?: string;
        birthdate?: string;
        birthdate_formatted?: string;
        address?: string;
        medical_records?: string;
    };
    doctor: {
        id: number;
        name: string;
        sip: string;
        experience: number;
        profile_pic?: string;
    };
    payment?: {
        amount: number;
        payment_method: string;
        note?: string | null;
    } | null;
    checkin?: {
        checked_in_at: string;
        checked_in_at_formatted: string;
    };
    cancellation?: {
        cancelled_at: string;
        cancelled_by: string;
        reason: string;
    };
    reschedules: {
        id: number;
        old_date: string;
        old_time: string;
        new_date: string;
        new_time: string;
        reason: string;
        status: string;
        created_at: string;
    }[];
}

/** Patient item for admin list page */
export interface PatientItem {
    id: number;
    nik: string;
    name: string;
    phone: string;
    email: string;
    medical_records: string;
    gender: string;
    address?: string;
    total_visits: number;
    first_visit: string;
    first_visit_formatted: string;
    last_visit: string;
    last_visit_formatted: string;
    created_at: string;
    created_at_formatted: string;
}

/** Doctor item for admin list page */
export interface DoctorItem {
    id: number;
    name: string;
    sip: string;
    experience: number;
    profile_pic?: string;
    is_active: boolean;
    total_bookings: number;
    created_at: string;
    created_at_formatted: string;
}
