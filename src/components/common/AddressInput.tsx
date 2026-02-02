import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useGoogleAutocompleteMutation } from "@/store/apis/map.api";
import { Loader2, MapPin } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

export type AddressSuggestion = {
  description: string;
  place_id: string;
};

type AddressInputProps = {
  value?: string;
  onChange?: (value: string, suggestion: AddressSuggestion | null) => void;
  placeholder?: string;
  error?: string;
  /** Root wrapper className */
  className?: string;
  /** Input element className */
  inputClassName?: string;
  /** Dropdown options container className */
  optionsClassName?: string;
  /** Single option item className */
  optionClassName?: string;
  /** Error message className */
  errorClassName?: string;
  /** Icon wrapper className */
  iconClassName?: string;
};

const getDisplayText = (suggestion: AddressSuggestion | null): string =>
  suggestion?.description ?? "";

const mapApiResponseToSuggestion = (item: {
  placePrediction?: { placeId?: string; text?: { text?: string } };
}): AddressSuggestion | null => {
  const pred = item?.placePrediction;
  if (!pred?.placeId || !pred?.text?.text) return null;
  return {
    description: pred.text.text,
    place_id: pred.placeId,
  };
};

export const AddressInput = ({
  value,
  onChange,
  placeholder = "Enter address...",
  error,
  className,
  inputClassName,
  optionsClassName,
  optionClassName,
  errorClassName,
  iconClassName,
}: AddressInputProps) => {
  const [query, setQuery] = useState(value ?? "");
  const [selected, setSelected] = useState<AddressSuggestion | null>(null);
  const [trigger, { data: apiSuggestions, isLoading }] =
    useGoogleAutocompleteMutation();

  const suggestions = useMemo(() => {
    if (!Array.isArray(apiSuggestions)) return [];
    return apiSuggestions
      .map(mapApiResponseToSuggestion)
      .filter((s): s is AddressSuggestion => s !== null);
  }, [apiSuggestions]);

  const debouncedFetch = useCallback(() => {
    const q = query.trim();
    if (q.length < 2) return;
    trigger({ input: q });
  }, [query, trigger]);

  useEffect(() => {
    const t = setTimeout(debouncedFetch, 300);
    return () => clearTimeout(t);
  }, [debouncedFetch]);

  // Sync with external value prop when controlled and value differs from selection
  useEffect(() => {
    if (value !== undefined && value !== getDisplayText(selected)) {
      setQuery(value);
      setSelected(null);
    }
  }, [value, selected]);

  const handleChange = (suggestion: AddressSuggestion | null) => {
    setSelected(suggestion);
    setQuery(getDisplayText(suggestion));
    onChange?.(getDisplayText(suggestion), suggestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setQuery(next);
    setSelected(null);
    onChange?.(next, null);
  };

  const showOptions =
    query.length >= 2 && (suggestions.length > 0 || isLoading);

  return (
    <div className={clsx("relative", className)}>
      <Combobox
        value={selected}
        onChange={handleChange}
        onClose={() => {}}
        by="place_id"
      >
        <div className="relative">
          <div
            className={clsx(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
              iconClassName
            )}
          >
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <ComboboxInput
            displayValue={(suggestion: AddressSuggestion | null | undefined) =>
              suggestion?.description ?? query
            }
            onChange={handleInputChange}
            placeholder={placeholder}
            className={clsx(
              "w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none",
              isLoading ? "pr-10" : "pr-4",
              error ? "border-red-500" : "border-gray-300",
              inputClassName
            )}
            autoComplete="off"
          />
          {isLoading && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          )}
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-(--input-width) mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto",
            "transition duration-200 ease-out empty:invisible data-closed:scale-95 data-closed:opacity-0",
            optionsClassName
          )}
        >
          {showOptions && isLoading && suggestions.length === 0 && (
            <div className="px-3 py-4 text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              Searching...
            </div>
          )}
          {showOptions &&
            suggestions.map((suggestion) => (
              <ComboboxOption
                key={suggestion.place_id}
                value={suggestion}
                className={clsx(
                  "cursor-pointer px-3 py-3 text-sm text-gray-900 data-focus:bg-blue-50",
                  optionClassName
                )}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  {suggestion.description}
                </span>
              </ComboboxOption>
            ))}
        </ComboboxOptions>
      </Combobox>

      {error && (
        <p
          className={clsx(
            "text-red-500 text-xs mt-1 flex items-center",
            errorClassName
          )}
        >
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};
