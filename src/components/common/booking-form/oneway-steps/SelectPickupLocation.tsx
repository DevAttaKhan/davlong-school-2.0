import { MapPin, X } from "lucide-react";
import React from "react";
import { AddressInput } from "../../AddressInput";

type Props = {
  nextStep: (validationFields: string[], nextStep?: string) => void;
  prevStep: () => void;
};
export const SelectPickupLocation: React.FC<Props> = ({
  nextStep,
  prevStep,
}) => {
  const handleNextStep = () => {
    nextStep(["pickupLocation", "dropoffLocation"], "add-stops");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4">
      {/* Main Card */}
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevStep}
            className="text-blue-600 text-xs sm:text-sm hover:text-blue-700 transition-colors duration-200 px-1.5 sm:px-3 py-1.5 rounded-[2.375rem] border border-blue-600 bg-white"
          >
            <span className="hidden sm:inline">← Back</span>
            <span className="sm:hidden">←</span>
          </button>

          {/* Progress Bar */}
          <div className="flex-1 max-w-[35rem] mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "16.67%" }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-[2.375rem] hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="px-6 sm:px-8 md:px-16 lg:px-[110px] mt-6 sm:mt-8 md:mt-[40px] space-y-8">
          {/* Icon and Title */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-b from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Let’s plan your trip
            </h1>
            <p className="text-sm font-normal leading-[145%] tracking-[-0.02em] text-center text-gray-600">
              We’ll start by finding out where you’re going and where you want
              to be picked up.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Pick-up Location */}
            <div className="space-y-2">
              <label className="text-gray-900 text-[18px] leading-[125%] tracking-[-0.02em] font-semibold block">
                Pick-up location
              </label>
              <p className="text-gray-600 text-sm">
                Where should we pick you up? <br />
                Please enter the exact address or Eircode where your trip will
                begin.
                <br />
                (Example: West Cork Hotel Skibbereen or P81 FH63)
              </p>
              <AddressInput value="corkd" onChange={() => {}} />
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-gray-900 text-[18px] leading-[125%] tracking-[-0.02em] font-semibold block">
                Destination
              </label>
              <p className="text-gray-600 text-sm">
                Where are you going? Type the exact address or Eircode of your
                destination.
              </p>
              <input />
            </div>

            {/* Stops Information */}
            <div className="bg-[#F0F2F4] rounded-lg p-4 flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <p className="text-gray-900 font-bold mb-1">
                  Do you want to make stops along the way?
                </p>
                <p className="text-gray-500 text-sm">
                  No problem – you can add extra stops in the next step.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 px-6 sm:px-8 md:px-16 lg:px-[110px]">
          <button
            onClick={handleNextStep}
            // disabled={!formData.from || !formData.to}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next: Add Stops</span>
          </button>
        </div>
      </div>
    </div>
  );
};
