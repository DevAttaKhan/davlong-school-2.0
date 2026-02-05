/** Shared content padding for booking form steps */
export const CONTENT_PADDING =
  "px-6 sm:px-8 md:px-16 lg:px-[110px]";

/** Step progress values (0-100) */
export const STEP_PROGRESS = {
  PICKUP_LOCATION: 16.67,
  ADD_STOPS: 33.33,
  DATES_TIMES: 50,
  GROUP_DETAILS: 66.67,
  CONTACT_DETAILS: 83.33,
  REVIEW: 100,
} as const;
