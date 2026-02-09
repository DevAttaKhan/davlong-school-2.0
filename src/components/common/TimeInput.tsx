import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { parse } from "date-fns";

type TimeInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
};

export const TimeInput = ({
  value,
  onChange,
  placeholder = "--:--",
  className = "",
  error,
}: TimeInputProps) => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  // Parse existing value from props
  useEffect(() => {
    if (value) {
      try {
        const time = parse(value, "HH:mm", new Date());
        const hour24 = time.getHours();
        const minute = time.getMinutes();
        setSelectedHour(hour24 % 12 || 12);
        setSelectedMinute(minute);
        setSelectedPeriod(hour24 >= 12 ? "PM" : "AM");
      } catch (e) {
        // Invalid time format
        setSelectedHour(null);
        setSelectedMinute(null);
        setSelectedPeriod("AM");
      }
    } else {
      setSelectedHour(null);
      setSelectedMinute(null);
      setSelectedPeriod("AM");
    }
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleTimeSelect = (
    hour: number | null,
    minute: number | null,
    period: "AM" | "PM"
  ) => {
    if (hour !== null && minute !== null) {
      const hour24 =
        period === "PM" && hour !== 12
          ? hour + 12
          : period === "AM" && hour === 12
            ? 0
            : hour;
      const timeString = `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      onChange?.(timeString);
    }
  };

  const handleHourChange = (hour: number | null) => {
    setSelectedHour(hour);
    handleTimeSelect(hour, selectedMinute, selectedPeriod);
  };

  const handleMinuteChange = (minute: number | null) => {
    setSelectedMinute(minute);
    handleTimeSelect(selectedHour, minute, selectedPeriod);
  };

  const handlePeriodChange = (period: "AM" | "PM") => {
    setSelectedPeriod(period);
    handleTimeSelect(selectedHour, selectedMinute, period);
  };

  const displayValue =
    selectedHour !== null && selectedMinute !== null
      ? `${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")} ${selectedPeriod}`
      : placeholder;

  return (
    <div className={`relative ${className}`}>
      <Popover className="relative w-full">
        <div className="w-full">
          <PopoverButton className="w-full relative text-left">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              >
                {displayValue}
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </PopoverButton>
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <PopoverPanel
          transition
          anchor="bottom start"
          className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg transition duration-200 ease-in-out data-closed:scale-95 data-closed:opacity-0 mt-2"
        >
          {({ close }) => {
            const handleTimeChange = (
              hour: number | null,
              minute: number | null,
              period: "AM" | "PM"
            ) => {
              handleTimeSelect(hour, minute, period);
              // Close popover when all values are selected
              if (hour !== null && minute !== null) {
                setTimeout(() => close(), 100);
              }
            };

            return (
              <div className="p-4">
                <div className="flex gap-4 justify-center">
                  {/* Hours Column */}
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      Hour
                    </div>
                    <div className="overflow-y-auto max-h-48 space-y-1">
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          type="button"
                          onClick={() => {
                            handleHourChange(hour);
                            handleTimeChange(
                              hour,
                              selectedMinute,
                              selectedPeriod
                            );
                          }}
                          className={`w-12 h-8 flex items-center justify-center text-sm rounded border transition-colors ${
                            selectedHour === hour
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {hour.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minutes Column */}
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      Min
                    </div>
                    <div className="overflow-y-auto max-h-48 space-y-1">
                      {minutes.map((minute) => (
                        <button
                          key={minute}
                          type="button"
                          onClick={() => {
                            handleMinuteChange(minute);
                            handleTimeChange(
                              selectedHour,
                              minute,
                              selectedPeriod
                            );
                          }}
                          className={`w-12 h-8 flex items-center justify-center text-sm rounded border transition-colors ${
                            selectedMinute === minute
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {minute.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AM/PM Column */}
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2 font-medium">
                      Period
                    </div>
                    <div className="space-y-1">
                      {(["AM", "PM"] as const).map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => {
                            handlePeriodChange(period);
                            handleTimeChange(
                              selectedHour,
                              selectedMinute,
                              period
                            );
                          }}
                          className={`w-12 h-8 flex items-center justify-center text-sm rounded border transition-colors ${
                            selectedPeriod === period
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </PopoverPanel>
      </Popover>
    </div>
  );
};
