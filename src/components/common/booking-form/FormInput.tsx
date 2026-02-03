type TextInputProps = {
  value?: string | null;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "password";
  className?: string;
  error?: string;
};

export const FormInput = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  className = "",
  error,
}: TextInputProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-base font-semibold text-gray-900 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full py-3 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};
