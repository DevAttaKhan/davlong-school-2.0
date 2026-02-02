"use client";
import React from "react";

import { ArrowRight, RefreshCw, X } from "lucide-react";
import PointArrow from "@/assets/svgs/point-arrow.svg";

type Props = {
  selectTripType: (tripType: "roundtrip" | "oneway") => void;
};

export const SelectTripType: React.FC<Props> = ({ selectTripType }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <div className="flex-1 flex flex-col mt-[40px]">
        <div className="flex-1 px-3 sm:px-4 py-4 overflow-y-auto scrollbar-hide">
          <div className="mx-auto w-full max-w-[982px] md:h-[643px]">
            {/* Trip Type Selection */}
            <div className="text-center py-6 sm:py-8 md:py-12 bg-white rounded-2xl shadow-lg border border-blue-100 p-3 sm:p-4">
              {/* Header bar with Back + Stepper + Cancel */}
              <div className="flex items-center justify-between pb-3 gap-1 sm:gap-4">
                <button className="text-blue-600 text-xs sm:text-sm hover:text-blue-700 transition-colors duration-200 px-1.5 sm:px-3 py-1.5 rounded-[2.375rem]  bg-white"></button>
                <div className="h-2 bg-gray-300 rounded-full overflow-hidden flex-1 max-w-[35rem]">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(1 / 6) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="text-gray-600 text-xs sm:text-sm hover:text-gray-700 transition-colors duration-200 px-1.5 sm:px-3 py-1.5 rounded-[2.375rem] border border-gray-300 bg-gray-50 flex items-center gap-1"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Cancel</span>
                </button>
              </div>

              {/* Icon + Title */}
              <div className="flex flex-col items-center gap-3 mt-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <img
                    src={PointArrow}
                    alt="Point Arrow"
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                </div>
                <h1 className="text-[32px] leading-[100%] tracking-[-0.04em] font-semibold text-blue-900 text-center">
                  Choose your trip type
                </h1>
              </div>
              <div className="px-4 sm:px-8 md:px-[70px]">
                <p
                  className="text-black text-center text-sm sm:text-base md:text-[18px] leading-[145%] tracking-[-0.02em] font-normal my-4 sm:my-6"
                  style={{ fontFamily: "Inter" }}
                >
                  We’ll start by finding out where you’re going and where you
                  want to be picked up.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={() => selectTripType("roundtrip")}
                  className="group bg-white rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center w-[352px] h-[240px] flex flex-col items-center justify-center p-6"
                >
                  <div className="w-[50px] h-[50px] bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw  className="w-8 h-8  text-white" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-3 group-hover:text-blue-700 transition-colors duration-200">
                    You travel to your destination and then come back to where
                    you started.
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">
                    You travel to your destination and back again to the
                    starting point
                  </p>
                </button>

                <button
                  onClick={() => selectTripType("oneway")}
                  className="group bg-white rounded-2xl shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-center w-[352px] h-[240px] flex flex-col items-center justify-center p-6"
                >
                  <div className="w-[50px] h-[50px] bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-3 group-hover:text-blue-700 transition-colors duration-200">
                    You travel to your destination and finish there, without
                    coming back.
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed text-center">
                    You travel from one place to another, without returning
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
