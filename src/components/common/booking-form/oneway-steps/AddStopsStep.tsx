import { X, Plus, Flag, Triangle } from "lucide-react";

import { StopComposer } from "./AddStopElements";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type OneWayStepsSchemaType } from "./schema";
import { ArrowSharpRight } from "@/assets/icons";

export const AddStopsStep = ({ nextStep, prevStep }) => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<OneWayStepsSchemaType>();

  const { fields, append, remove } = useFieldArray<
    OneWayStepsSchemaType,
    "stop_leads"
  >({
    control,
    name: "stop_leads",
  });

  const pickupLocation = getValues("pickupLocation");
  const dropoffLocation = getValues("dropoffLocation");

  const handleAddStop = () => {
    append({
      isEditing: true,
      estimated_time: 0,
      location: "",
      order: fields.length + 1,
    });
  };

  const handleRemoveStop = (index: number) => {
    remove(index);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      {/* Main Card */}
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px] ">
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
                style={{ width: "33.33%" }}
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
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center ">
              <div className="bg-[#0a67e7] p-4 rounded-full">
                <ArrowSharpRight
                  width={28}
                  height={28}
                  className=" text-white"
                />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Outbound Journey
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4">
              Let’s plan your outbound journey in more details.
            </p>
          </div>

          {/* Journey Visualization */}
          <div className="space-y-4 sm:space-y-6 max-w-[670px] mx-auto px-2 sm:px-0">
            {/* Extra stops section */}
            <div className="space-y-4">
              <div>
                <div className="text-sm font-bold leading-[140%] tracking-[-0.02em] text-[#55585E] mb-2">
                  Do you want to make extra stops on the way to your
                  destination?
                </div>
                <div className="text-sm font-medium leading-[140%] tracking-[-0.02em] text-[#55585E]">
                  If you want to make any stops, add them below. You can provide
                  the time you want to stay at
                  <br />
                  each stop, or leave it at 0 if it's just a pick-up.
                </div>
              </div>
            </div>

            {/* Journey stops visualization */}
            <div className="space-y-4">
              {/* Timeline Container */}
              <div className="relative">
                {/* Single Continuous Vertical Timeline Line */}
                <div className="absolute left-[0.65rem] top-6 bottom-6 w-1 bg-[#D3D9DF]"></div>

                {/* First stop - Origin */}
                <div className="flex items-center space-x-3 mb-4 relative">
                  <div className="w-6 h-6 bg-[#D3D9DF] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                    <Triangle className="w-3 h-3 text-white fill-white rotate-180" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-[10px]">
                    <div className="text-sm font-medium text-gray-900">
                      {pickupLocation || "Pick-up location"}
                    </div>
                  </div>
                </div>

                {/* Stops - only show when they exist */}

                <div className="space-y-4">
                  {fields?.map((stop, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 mb-4 relative"
                    >
                      <div className="w-3 h-3 bg-[#7A8D9E] rounded-full flex-shrink-0 relative z-10 ml-2 mr-2" />
                      <StopComposer
                        stop={stop as any}
                        onRemove={() => handleRemoveStop(index)}
                        index={index}
                      />
                    </div>
                  ))}

                  {/* Add Stop button when stops exist - at the bottom */}
                </div>
                <div
                  onClick={handleAddStop}
                  className="flex items-center space-x-3 py-4 add-stop-container ml-8"
                >
                  <button className="bg-white rounded-lg px-3 py-[13px] flex items-center justify-center space-x-3 cursor-pointer hover:bg-blue-50 transition-colors border border-dashed border-blue-500 hover:border-blue-700 flex-1">
                    <Plus className="w-4 h-4" />
                    <span>Add Stop</span>
                  </button>
                </div>

                {/* Destination */}
                <div className="flex items-center space-x-3 mb-4 relative">
                  <div className="w-6 h-6 bg-[#D3D9DF] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                    <Flag className="w-3 h-3 text-white fill-white" />
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-[10px]">
                    <div className="text-sm font-medium text-gray-900">
                      {dropoffLocation || "Destination"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8 px-6 sm:px-8 md:px-16 lg:px-[110px]">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition-colors">
            <span>Next: Choose Dates & Times</span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {false && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-2xl font-bold">?</span>
                </div>
              </div>

              {/* Message */}
              <div className="text-center mb-6">
                <p className="text-gray-900 font-medium text-lg">
                  You haven't selected any extra stops.
                </p>
                <p className="text-gray-700 mt-1">Do you want to proceed?</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-4"></div>

              {/* Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Cancel
                </button>
                <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
