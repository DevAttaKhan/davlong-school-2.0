import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

import type { GooglePlacesAutocompleteResponse } from "@/types/googlePlaces.interfaces";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY!;

// Bus factor multiplier: Buses are typically ~45–50% slower than car driving times
// (closer to Google Maps public transit times). Applied to travel time for both one-way and return.
// Default: 1.45; set VITE_BUS_FACTOR to override (e.g. 1.2 for 20% slower, 1.5 for 50% slower).
const BUS_FACTOR = parseFloat(import.meta.env.VITE_BUS_FACTOR || "1.2");

// Types for DateTime API (Directions API)
export interface DateTimeRequest {
  origin: string;
  destination: string;
  waypoints?: string[];
  departureTime?: string; // ISO 8601 datetime string
}

export interface DateTimeResponse {
  arrivalTime: string; // HH:mm format
  arrivalDate: string; // YYYY-MM-DD format
  duration: string; // "H:MM hrs" format
  distance: number; // Distance in kilometers
  travelDurationSeconds: number; // Travel time in seconds
  totalDurationSeconds: number; // Total time including stops
}

// Custom base query that handles both Places API and Directions API
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
  // Check if this is a directions API call (starts with /api/google-directions or maps.googleapis.com)
  const url = typeof args === "string" ? args : args.url;
  const isDirectionsApi =
    url.startsWith("/api/google-directions") ||
    url.startsWith("https://maps.googleapis.com");

  if (isDirectionsApi) {
    // Use fetch directly for Directions API (handles proxy)
    const fullUrl =
      url.startsWith("/api/google-directions") || url.startsWith("http")
        ? url
        : `https://maps.googleapis.com/maps/api/${url}`;

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!response.ok) {
        return {
          error: {
            status: response.status,
            data: `HTTP error! status: ${response.status}`,
          },
        };
      }

      const data = await response.json();
      return { data };
    } catch (error: any) {
      return {
        error: {
          status: "FETCH_ERROR",
          error: error?.message || "Failed to fetch",
        },
      };
    }
  }

  // Use Places API base query for other endpoints
  const placesBaseQuery = fetchBaseQuery({
    baseUrl: "https://places.googleapis.com/v1/",
    prepareHeaders: (headers) => {
      headers.set("X-Goog-Api-Key", GOOGLE_API_KEY);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  });

  return placesBaseQuery(args, api, extraOptions);
};

export const mapApi = createApi({
  reducerPath: "mapApi",
  baseQuery: customBaseQuery,
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
    getDateTime: builder.query<
      DateTimeResponse,
      DateTimeRequest & { tripStops?: Array<{ estimated_time: number }> }
    >({
      query: ({ origin, destination, waypoints, departureTime }) => {
        const params = new URLSearchParams({
          origin,
          destination,
          key: GOOGLE_API_KEY,
          mode: "driving",
          units: "metric",
          traffic_model: "best_guess", // Use best_guess for traffic predictions
          alternatives: "true", // Request alternative routes to match Google Maps UI
        });

        if (departureTime) {
          const timestamp = Math.floor(new Date(departureTime).getTime() / 1000);
          params.append("departure_time", timestamp.toString());
        }

        if (waypoints && waypoints.length > 0) {
          params.append("waypoints", waypoints.join("|"));
        }

        const url = import.meta.env.DEV
          ? `/api/google-directions/directions/json?${params.toString()}`
          : `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`;

        return {
          url,
          method: "GET",
        };
      },
      transformResponse: (
        response: any,
        _meta: any,
        arg: DateTimeRequest & { tripStops?: Array<{ estimated_time: number }> }
      ): DateTimeResponse => {
        if (!response || response.status !== "OK" || !response.routes?.[0]) {
          throw new Error(response?.error_message || "Failed to get directions");
        }

        // If multiple routes are available, use the first one (usually the best/default route)
        // This matches what Google Maps UI typically shows
        const route = response.routes[0];
        
        let travelDurationSeconds = 0;
        let totalDistanceMeters = 0;

        // Sum up travel duration and distance from all legs
        // IMPORTANT: Use duration_in_traffic if available (accounts for real-time traffic)
        // This matches what Google Maps UI shows
        route.legs.forEach((leg: any) => {
          // Prefer duration_in_traffic when departure_time is provided (more accurate)
          // duration_in_traffic is only available when departure_time is set
          let legDuration = 0;
          
          if (arg.departureTime && leg.duration_in_traffic?.value) {
            // Use traffic-aware duration (matches Google Maps UI)
            legDuration = leg.duration_in_traffic.value;
          } else if (leg.duration?.value) {
            // Fallback to base duration if traffic data not available
            legDuration = leg.duration.value;
          }
          
          travelDurationSeconds += legDuration;
          totalDistanceMeters += leg.distance?.value || 0;
        });

        // Apply bus factor to adjust travel time for bus speeds
        // Buses are slower than cars due to size, acceleration, and operational considerations
        const busAdjustedTravelDurationSeconds = Math.round(
          travelDurationSeconds * BUS_FACTOR
        );

        // Calculate total rest time at stops (estimated_time is in minutes)
        const tripStops = arg.tripStops || [];
        const totalRestTimeMinutes = tripStops.reduce(
          (sum, stop) => sum + (stop.estimated_time || 0),
          0
        );
        const totalRestTimeSeconds = totalRestTimeMinutes * 60;

        // Total trip duration = bus-adjusted travel time + rest time at stops
        const totalDurationSeconds = busAdjustedTravelDurationSeconds + totalRestTimeSeconds;

        // Calculate arrival time = departure time + travel time + rest time
        if (!arg.departureTime) {
          throw new Error("Departure time is required");
        }
        const departureDateTime = new Date(arg.departureTime);
        const arrivalDateTime = new Date(
          departureDateTime.getTime() + totalDurationSeconds * 1000
        );

        // Format arrival in local time so date and time stay consistent (avoids UTC date
        // showing the previous/next day when the user is not in UTC)
        const arrivalTime = arrivalDateTime.toTimeString().slice(0, 5); // HH:mm local
        const y = arrivalDateTime.getFullYear();
        const m = String(arrivalDateTime.getMonth() + 1).padStart(2, "0");
        const d = String(arrivalDateTime.getDate()).padStart(2, "0");
        const arrivalDate = `${y}-${m}-${d}`; // YYYY-MM-DD local

        // Format duration as "H:MM hrs"
        const totalHours = Math.floor(totalDurationSeconds / 3600);
        const totalMinutes = Math.floor((totalDurationSeconds % 3600) / 60);
        const duration = `${totalHours}:${totalMinutes.toString().padStart(2, "0")} hrs`;

        return {
          arrivalTime,
          arrivalDate,
          duration,
          distance: Math.round(totalDistanceMeters / 1000), // Convert to km
          travelDurationSeconds: busAdjustedTravelDurationSeconds, // Return bus-adjusted time
          totalDurationSeconds,
        };
      },
    }),
  }),
});

export const {
  useGoogleAutocompleteMutation,
  useGetPlaceDetailsQuery,
  useLazyGetPlaceDetailsQuery,
  useLazyGetDateTimeQuery,
} = mapApi;
