import type { ReactNode } from "react";
import { clsx } from "clsx";
import { AddressInput, type AddressSuggestion } from "../AddressInput";

type LocationFieldProps = {
  label: string;
  description?: string | ReactNode;
  value?: string;
  onChange?: (value: string, suggestion: AddressSuggestion | null) => void;
  error?: string;
  placeholder?: string;
  className?: string;
};

export const LocationField = ({
  label,
  description,
  value,
  onChange,
  error,
  placeholder,
  className,
}: LocationFieldProps) => {
  return (
    <div className={clsx("space-y-2", className)}>
      <label className="text-gray-900 text-[18px] leading-[125%] tracking-[-0.02em] font-semibold block">
        {label}
      </label>
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      <AddressInput
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
    </div>
  );
};
