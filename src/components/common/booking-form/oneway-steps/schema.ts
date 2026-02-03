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
  pickup_date: z
    .string()
    .min(1, { message: "Pickup date is required" })
    .refine(
      (date) => {
        if (!date) return false;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      },
      { message: "Invalid date format" }
    )
    .optional(),
  pickup_time: z
    .string()
    .min(1, { message: "Pickup time is required" })
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Time must be in HH:mm format",
    })
    .optional(),
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
  school_name: z
    .string()
    .min(1, { message: "School name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  instructor_name: z.string().optional(),
  teacher_incharge: z
    .string()
    .min(1, { message: "Teacher in-charge is required" }),
  phone_number: z.string().nullable().optional(),
  teachers_count: z.number().int().min(1),
  students_count: z.number().int().min(1),
  special_instructions: z.string().optional(),
  outbound_trip: TripSchema,
  return_trip: TripSchema.nullable().optional(),
});

export type LeadSchemaType = z.infer<typeof LeadSchema>;
