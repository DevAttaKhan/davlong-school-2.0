/**
 * Extracts a plain-text error message from API/RTK Query error responses.
 * Handles various response shapes (detail, message, errors object, array).
 */
export function extractApiErrorMessage(error: unknown): string {
  if (error == null) {
    return "Something went wrong. Please try again.";
  }

  // RTK Query FetchBaseQueryError: { status, data? }
  if (typeof error === "object" && "data" in error) {
    const data = (error as { data?: unknown }).data;
    const message = messageFromData(data);
    if (message) return message;
    const status = (error as { status?: number }).status;
    if (typeof status === "number") {
      if (status === 400) return "Invalid request. Please check your input.";
      if (status === 401) return "Please sign in again.";
      if (status === 403) return "You don't have permission to do this.";
      if (status === 404) return "The requested resource was not found.";
      if (status >= 500) return "Server error. Please try again later.";
    }
  }

  // SerializedError or Error-like: message
  if (typeof error === "object" && "message" in error) {
    const msg = (error as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }

  // Plain string
  if (typeof error === "string" && error.trim()) return error;

  return "Something went wrong. Please try again.";
}

function messageFromData(data: unknown): string | null {
  if (data == null) return null;

  if (typeof data === "string") return data.trim() || null;

  if (Array.isArray(data)) {
    const first = data[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first != null && "message" in first) {
      const m = (first as { message?: unknown }).message;
      if (typeof m === "string") return m;
    }
    return null;
  }

  if (typeof data !== "object") return null;

  const obj = data as Record<string, unknown>;

  if (typeof obj.message === "string" && obj.message.trim()) return obj.message;
  if (typeof obj.detail === "string" && obj.detail.trim()) return obj.detail;
  if (Array.isArray(obj.detail) && obj.detail.length > 0) {
    const first = obj.detail[0];
    if (typeof first === "string") return first;
  }
  if (obj.errors && typeof obj.errors === "object" && !Array.isArray(obj.errors)) {
    const entries = Object.entries(obj.errors);
    const firstMsg = entries.find(([, v]) => Array.isArray(v) && v.length > 0)?.[1];
    if (Array.isArray(firstMsg) && typeof firstMsg[0] === "string") return firstMsg[0];
  }

  return null;
}
