import z from "zod";

// =============================================================================
// trip_stops table
// =============================================================================

export const TripStopSchema = z.object({
  id: z.number().int().optional(),
  trip_id: z.number().int().optional(),
  location: z.string().min(1, { message: "Stop location is required" }),
  estimated_time: z.number().int().min(0),
  stop_order: z.number().int().min(1),
  /** UI-only: edit mode (not persisted to DB) */
  isEditing: z.boolean().optional(),
});

export type TripStopSchemaType = z.infer<typeof TripStopSchema>;

// =============================================================================
// trips table
// =============================================================================

export const TripTypeEnum = z.enum(["OUTBOUND", "RETURN"]);

export const TripSchema = z.object({
  id: z.number().int().optional(),
  type: TripTypeEnum,
  pickup_location: z
    .string()
    .min(5, { message: "Pickup location is required" }),
  dropoff_location: z
    .string()
    .min(5, { message: "Dropoff location is required" }),
  trip_stops: z.array(TripStopSchema).optional(),
  pickup_date: z.string().optional(), // date as ISO string
  pickup_time: z.string().optional(), // time as HH:mm
  arrival_time: z.string().optional(),
  duration: z.string().optional(),
  distance: z.number().optional(),
  created_at: z.string().datetime().optional(),
});

export type TripSchemaType = z.infer<typeof TripSchema>;

// =============================================================================
// leads table
// =============================================================================

export const LeadSchema = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int().nullable().optional(),
  school_name: z.string(),
  email: z.string().email(),
  instructor_name: z.string(),
  teacher_incharge: z.string(),
  phone_number: z.string().nullable().optional(),
  teachers_count: z.number().int().min(1),
  students_count: z.number().int().min(1),
  special_instructions: z.string().optional(),
  outbound_trip: TripSchema,
  return_trip: TripSchema.nullable().optional(),
});

export type LeadSchemaType = z.infer<typeof LeadSchema>;
