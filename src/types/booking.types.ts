export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string;
}