import { Minus, Plus } from "lucide-react";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
  error?: string;
};

export const PassengerCountInput: React.FC<Props> = ({
  value = 1,
  onChange,
  label = "Teachers",
  className = "",
  error,
}) => {
  const handleIncrement = () => {
    onChange?.(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange?.(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10) || 0;
    onChange?.(Math.max(1, newValue));
  };

  return (
    <div className={className}>
      <label className="block text-base font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={1}
          value={value}
          onChange={handleInputChange}
          className={`w-full text-center text-lg font-semibold text-gray-900 border rounded-lg py-3 pl-12 pr-12 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= 1}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={handleIncrement}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
