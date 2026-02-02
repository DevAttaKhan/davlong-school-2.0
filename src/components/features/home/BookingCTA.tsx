import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

export const BookingCTA = () => {
  return (
    <Link
      to="/booking"
      className="group relative overflow-hidden bg-white hover:bg-gray-50 text-blue-700 font-bold py-5 px-4 sm:py-6 sm:px-8 md:py-8 md:px-12 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-4 w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Sparkles className="relative w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:animate-spin shrink-0" />
      <span className="relative text-lg sm:text-2xl md:text-3xl font-bold">
        Plan Your Trip - Try Now
      </span>
      <ArrowRight className="relative w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-200 shrink-0" />
    </Link>
  );
};
