interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
}

// User model
export interface User extends BaseModel {
    name: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'staff';
}

// Doctor model
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

// DoctorWorkingPeriod model
export interface DoctorWorkingPeriod extends BaseModel {
    doctor_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    // Relations
    doctor?: Doctor;
}

// DoctorTimeOff model
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

// Time slot for booking
export interface TimeSlot {
    time: string;
    available: boolean;
    reason?: 'time_off' | 'booked' | 'past' | null;
}

// Available date with slots
export interface AvailableDate {
    date: string;
    day_name: string;
    formatted_date: string;
    slots: TimeSlot[];
}

// Available slots keyed by date string
export type AvailableSlots = Record<string, AvailableDate>;

// Booking status type
export type BookingStatus =
    | 'confirmed'
    | 'checked_in'
    | 'cancelled'
    | 'no_show';

// Booking model
export interface Booking extends BaseModel {
    doctor_id: number;
    code: string;
    booking_date: string;
    start_time: string;
    status: BookingStatus;
    is_active: number;
    // Relations
    doctor?: Doctor;
    patient_detail?: BookingPatientDetail;
    checkin?: BookingCheckin;
    cancellation?: BookingCancellation;
    reschedules?: BookingReschedule[];
    notifications?: Notification[];
}

// BookingPatientDetail model (primary key is booking_id)
export interface BookingPatientDetail {
    booking_id: number;
    patient_name: string;
    patient_nik: string;
    patient_email?: string;
    patient_phone: string;
    complaint?: string;
    created_at: string;
    updated_at: string;
    // Relations
    booking?: Booking;
}

// BookingCheckin model (primary key is booking_id)
export interface BookingCheckin {
    booking_id: number;
    checked_in_at: string;
    created_at: string;
    updated_at: string;
    // Relations
    booking?: Booking;
}

// BookingCancellation model (primary key is booking_id)
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

// BookingReschedule status type
export type RescheduleStatus =
    | 'pending_patient'
    | 'applied'
    | 'rejected'
    | 'expired';
export type RescheduleRequestedBy = 'patient' | 'staff';
export type PatientResponse = 'accepted' | 'rejected';

// BookingReschedule model
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

// Notification channel and status types
export type NotificationChannel = 'whatsapp' | 'email' | 'sms';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'cancelled';
export type NotificationType =
    | 'booking_confirmation'
    | 'reminder'
    | 'reschedule_request'
    | 'reschedule_applied'
    | 'cancellation';

// Notification model
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

// Page props helper type
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

// Dashboard Stats
export interface DashboardStats {
    bookings_today: number;
    checkins_today: number;
    cancellations_today: number;
    reschedules_today: number;
}

// Booking List Item (for tables)
export interface BookingListItem {
    id: number;
    code: string;
    patient_name: string;
    patient_phone: string;
    doctor_name: string;
    booking_date: string;
    start_time: string;
    status: string;
    created_at: string;
}

// Booking Full Item (for list booking page with more details)
export interface BookingFullItem {
    id: number;
    code: string;
    patient_name: string;
    patient_nik: string;
    patient_phone: string;
    patient_email: string;
    doctor_name: string;
    booking_date: string;
    booking_date_formatted: string;
    start_time: string;
    status: string;
    complaint: string;
    created_at: string;
    created_at_formatted: string;
}
