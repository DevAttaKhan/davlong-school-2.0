import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { DayPicker } from "react-day-picker";
import type { Matcher } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabledDates?: Matcher | Matcher[];
  className?: string;
  error?: string;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  disabledDates,
  className = "",
  error,
}: DatePickerProps) => {
  const currentDate = value ? new Date(value) : undefined;
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number | undefined>(undefined);

  // Measure button width
  useEffect(() => {
    const updateWidth = () => {
      if (buttonRef.current) {
        setButtonWidth(buttonRef.current.offsetWidth);
      }
    };
    // Initial measurement
    updateWidth();
    // Update on resize
    window.addEventListener("resize", updateWidth);
    // Use ResizeObserver for more accurate measurements
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }
    return () => {
      window.removeEventListener("resize", updateWidth);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Popover className="relative w-full">
        <div ref={buttonRef} className="w-full">
          <PopoverButton
            className={`w-full relative text-left ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              >
                {value ? format(new Date(value), "MMM dd, yyyy") : placeholder}
              </div>
            </div>
          </PopoverButton>
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
        <PopoverPanel
          transition
          anchor="bottom start"
          style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
          className="z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 transition duration-200 ease-in-out data-closed:scale-95 data-closed:opacity-0 mt-2"
        >
          {({ close }) => (
            <DayPicker
              mode="single"
              selected={currentDate}
              onSelect={(date) => {
                if (date) {
                  onChange?.(format(date, "yyyy-MM-dd"));
                  close();
                }
              }}
              disabled={disabledDates ?? ({ before: new Date() } as Matcher)}
              className="rounded-lg"
            />
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
};
