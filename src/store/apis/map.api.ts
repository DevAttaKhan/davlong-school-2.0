import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { GooglePlacesAutocompleteResponse } from "@/types/googlePlaces.interfaces";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY!;

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://places.googleapis.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("X-Goog-Api-Key", GOOGLE_API_KEY);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    googleAutocomplete: builder.mutation<
      GooglePlacesAutocompleteResponse, // You may specify your type here
      { input: string }
    >({
      query: ({ input }) => ({
        url: "places:autocomplete",
        method: "POST",
        body: {
          input,
          includedRegionCodes: ["ie"], // restrict to Ireland
          includeQueryPredictions: false,
        },
        headers: {
          "X-Goog-FieldMask":
            "suggestions.placePrediction.placeId," +
            "suggestions.placePrediction.text," +
            "suggestions.placePrediction.structuredFormat",
        },
      }),
      transformResponse: (response: any) => response?.suggestions || [],
    }),
    getPlaceDetails: builder.query<
      any, // You may specify your type here
      string
    >({
      query: (placeId: string) => ({
        url: `places/${placeId}`,
        method: "GET",
        headers: {
          "X-Goog-FieldMask": "id,displayName,formattedAddress,location",
        },
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useGoogleAutocompleteMutation,
  useGetPlaceDetailsQuery,
  useLazyGetPlaceDetailsQuery,
} = mapApi;
