import type { SerializedError } from "@reduxjs/toolkit";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setIsValidToken, setToken } from "../slices/auth.slice";
import type { RootState } from "../store";

import { QueryKeys } from "@/lib/constants";

interface RefreshTokenResponse {
  result: {
    token: {
      access: {
        token: string;
      };
      refresh: {
        token: string;
      };
    };
  };
}

interface ErrorData {
  path?: string;
  detail?: string | unknown[];
  message?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "*/*");

    // Only set ngrok header in development
    if (import.meta.env.DEV) {
      headers.set("ngrok-skip-browser-warning", "true");
    }

    const { token } = (getState() as RootState).auth;

    headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | SerializedError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as FetchBaseQueryError;
    const errorData = error.data as ErrorData | undefined;
    const errorPath = errorData?.path || "";

    // Fix: Changed .include() to .includes()
    if (error.status === 401 && !errorPath.includes("login")) {
      api.dispatch(setIsValidToken(false));

      const state = api.getState() as RootState;
      const refreshToken =
        state.auth.refreshToken || localStorage.getItem("refreshToken");

      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "GET",
            headers: {
              authorization: `Bearer ${refreshToken}`,
              Accept: "*/*",
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.error) {
          // Refresh failed, clear auth state
          window.localStorage.clear();
          api.dispatch(setIsValidToken(false));
        } else if (refreshResult.data) {
          // Refresh succeeded, update tokens
          const refreshData = refreshResult.data as RefreshTokenResponse;

          // Update localStorage
          localStorage.setItem(
            "accessToken",
            refreshData.result.token.access.token
          );
          localStorage.setItem(
            "refreshToken",
            refreshData.result.token.refresh.token
          );

          api.dispatch(
            setToken({
              token: refreshData.result.token.access.token,
              refreshToken: refreshData.result.token.refresh.token,
            })
          );
          api.dispatch(setIsValidToken(true));

          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        // No refresh token available, clear auth state
        window.localStorage.clear();
        api.dispatch(setIsValidToken(false));
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [QueryKeys.QUOTES],
  endpoints: () => ({}),
});
