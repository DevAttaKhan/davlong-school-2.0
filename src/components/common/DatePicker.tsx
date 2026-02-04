import {
  Calendar,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
} from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { DayPicker } from "react-day-picker";
import type { Matcher } from "react-day-picker";
import { format } from "date-fns";
import cn from "clsx";
import "react-day-picker/dist/style.css";
import { useState, useEffect } from "react";

type DatePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabledDates?: Matcher | Matcher[];
  className?: string;
  error?: string;
};

const now = new Date();
const MIN_DATE = new Date(2015, 0, 1);
const startMonth = new Date(2015, 0, 1);
const endMonth = new Date(now.getFullYear() + 2, 11, 31);

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  disabledDates,
  className = "",
  error,
}: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  useEffect(() => {
    setCurrentDate(value ? new Date(value) : undefined);
  }, [value]);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    if (date) {
      onChange?.(format(date, "yyyy-MM-dd"));
    }
  };

  const defaultMonth = currentDate ?? now;

  return (
    <div className={cn("relative", className)}>
      <Popover className="relative w-full">
        <div className="w-full">
          <PopoverButton
            className={cn("w-full relative text-left", {
              "border-red-500": error,
              "border-gray-300": !error,
            })}
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
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <PopoverPanel
          transition
          anchor="bottom start"
          className="z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4 transition duration-200 ease-in-out data-closed:scale-95 data-closed:opacity-0 mt-2 date-picker-popover"
        >
          {({ close }) => (
            <DayPicker
              mode="single"
              captionLayout="dropdown"
              navLayout="around"
              defaultMonth={defaultMonth}
              startMonth={startMonth}
              endMonth={endMonth}
              selected={currentDate}
              onSelect={(date) => {
                if (date) {
                  handleDateChange(date);
                  setTimeout(() => close(), 100);
                }
              }}
              disabled={disabledDates ?? ({ before: MIN_DATE } as Matcher)}
              className="rdp-root rounded-lg"
              classNames={{
                day: "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
                dropdowns:
                  "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
              }}
              components={{
                Chevron: ({ className, orientation, ...props }) => {
                  if (orientation === "left") {
                    return (
                      <ChevronLeftIcon className={cn("size-4")} {...props} />
                    );
                  }

                  if (orientation === "right") {
                    return <ChevronRight className={cn("size-4")} {...props} />;
                  }

                  return (
                    <ChevronDownIcon className={cn("size-4")} {...props} />
                  );
                },
              }}
            />
          )}
        </PopoverPanel>
      </Popover>
    </div>
  );
};
