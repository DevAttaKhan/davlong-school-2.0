import { apiSlice } from "./base.api";
import type {
  CreateLeadRequestBody,
  IAllLeadsResponse,
  IGetLeadsParams,
  IAllSchoolsResponse,
  ILeadDetails,
} from "@/types/lead.interface";
import { QueryKeys } from "@/lib/constants";

export const leadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLead: builder.mutation<unknown, CreateLeadRequestBody>({
      query: (body) => ({
        url: "lead/",
        method: "POST",
        body,
      }),
    }),
    getAllLeads: builder.query<IAllLeadsResponse, IGetLeadsParams>({
      query: (params: any) => ({
        url: "admin/leads/",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ quote_id }) => ({
                type: QueryKeys.QUOTES,
                id: quote_id,
              })),
              { type: QueryKeys.QUOTES, id: "LIST" },
            ]
          : [{ type: QueryKeys.QUOTES, id: "LIST" }],
    }),
    getSchools: builder.query<IAllSchoolsResponse, void>({
      query: () => ({
        url: "leads/schools/", // As per user request: api/leads/schools/ -> leads/schools/ relative to base
      }),
    }),
    getLeadById: builder.query<ILeadDetails, string>({
      query: (id) => ({
        url: `admin/leads/${id}/`,
      }),
      providesTags: (_result, _error, id) => [
        { type: QueryKeys.QUOTES, id },
      ],
    }),
    deleteLead: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `admin/leads/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: QueryKeys.QUOTES, id: "LIST" }],
    }),
  }),
});

export const {
  useCreateLeadMutation,
  useGetAllLeadsQuery,
  useGetSchoolsQuery,
  useGetLeadByIdQuery,
  useDeleteLeadMutation,
} = leadApi;
