type AdditionalInfoInputProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  rows?: number;
};

export const AdditionalInfoInput = ({
  value,
  onChange,
  label = "Additional information",
  placeholder = "Add any special Request and Instructions you'd like us to know.",
  className = "",
  error,
  rows = 4,
}: AdditionalInfoInputProps) => {
  return (
    <div className={className}>
      <label className="block text-base font-semibold text-gray-900 mb-2">
        {label}{" "}
        <span className="text-gray-500 font-normal">(OPTIONAL)</span>
      </label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
