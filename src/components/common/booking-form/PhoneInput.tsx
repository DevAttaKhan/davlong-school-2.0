type PhoneInputProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
};

export const PhoneInput = ({
  value,
  onChange,
  label = "Phone",
  placeholder = "Add this if you'd like us to text",
  className = "",
  error,
}: PhoneInputProps) => {
  return (
    <div className={className}>
      <label className="block text-base font-semibold text-gray-900 mb-2">
        {label} <span className="text-gray-500 font-normal">(OPTIONAL)</span>
      </label>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 pointer-events-none">
          <span className="text-gray-700 font-medium">IE +353</span>
          <div className="h-6 w-px bg-gray-300 mx-3"></div>
        </div>
        <input
          type="tel"
          value={value || ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3 pl-24 pr-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
