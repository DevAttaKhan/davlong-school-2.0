import type { IPagination } from "./common";

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

export interface IAllLeadsResponse {
  message: string;
  data: IAdminLead[];
  pagination: IPagination;
}

export interface IAdminLead {
  quote_id: number;
  created_at: string;
  school?: string;
  pickup?: string;
  dropoff?: string;
  trip_date?: string;
  passengers: number;
  price: string;
  status: string;
}

export interface IGetLeadsParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: "ASC" | "DESC";
  status?: string;
  school_name?: string;
}

export interface ISchool {
  name: string;
}

export interface IAllSchoolsResponse {
  message: string;
  data: string[];
}

export interface ITripStop {
  id: number;
  location: string;
  estimated_time: number;
  stop_order: number;
}

export interface ITripDetails {
  id: number;
  type: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  arrival_time: string;
  duration: string;
  distance: string;
  stops: ITripStop[];
}

export interface ILeadDetails {
  id: number;
  user: number;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  arrival_time: string;
  duration: string | null;
  is_roundtrip: boolean;
  vehicle_type: string | null;
  number_of_passengers: number;
  distance: string;
  estimated_price: string;
  calculated_price: string;
  admin_message: string;
  invoice_sent: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone_number: string;
  email_sent: boolean;
  institute_name: string;
  number_of_students: number;
  number_of_teachers: number;
  outbound_trip: ITripDetails;
  return_trip: ITripDetails | null;
  status: string;
  special_instructions: string;
}
