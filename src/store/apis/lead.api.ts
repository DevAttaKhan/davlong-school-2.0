import { apiSlice } from "./base.api";
import type { CreateLeadRequestBody } from "@/types/lead.interface";

export const leadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation<unknown, CreateLeadRequestBody>({
      query: (body) => ({
        url: "lead/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateLeadMutation } = leadApi;
