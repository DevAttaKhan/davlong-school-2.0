/** Single trip leg (outbound or return) for the lead API */
export interface LeadTrip {
  type: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  arrival_time: string;
  arrival_date: string;
  duration: string;
  distance: number;
  trip_stops: TripStop[];
}

export interface TripStop {
  estimated_time: number;
  location: string;
  stop_order: number;
}

/** Lead create request body (one-way: only outbound_trip; return: outbound_trip + return_trip) */
export interface CreateLeadRequestBody {
  school_name: string;
  email: string;
  teacher_incharge: string;
  phone_number: string;
  special_instructions: string;
  teachers_count: number;
  students_count: number;
  outbound_trip: LeadTrip;
  return_trip?: LeadTrip;
  privacy_agreed: boolean;
  submitted_at: string;
}

/** @deprecated Use LeadTrip */
export type OutboundTrip = LeadTrip;

/** @deprecated Use CreateLeadRequestBody */
export type Root = CreateLeadRequestBody;
  