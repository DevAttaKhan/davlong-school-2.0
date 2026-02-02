import z from "zod";

const StopSchema = z.object({
  location: z
    .string("Stop is required")
    .min(1, { message: "Stop must be at least 3 characters" }),
  estimated_time: z.number(),
  order: z.number(),
  isEditing: z.boolean().optional(),
});

export type OneWayStopSchemaType = z.infer<typeof StopSchema>;

export const OneWayStepsSchema = z.object({
  pickupLocation: z
    .string("Pickup location is required")
    .min(1, { message: "Pickup location must be at least 3 characters" }),
  dropoffLocation: z
    .string("Dropoff location is required")
    .min(1, { message: "Dropoff location must be at least 3 character" }),
  stop_leads: z.array(StopSchema).optional(),
});

export type OneWayStepsSchemaType = z.infer<typeof OneWayStepsSchema>;
