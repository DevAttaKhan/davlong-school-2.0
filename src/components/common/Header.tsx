import { useNavigate } from "react-router";
import Logo from "@/assets/images/logo.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between bg-[#2563EB]">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={Logo}
            alt="Dave Long Coach Travel Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
          />
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-500 hover:bg-blue-400 text-white font-normal text-xs sm:text-sm uppercase tracking-wide rounded-lg border border-blue-300/50 transition-all duration-200"
      >
        LOGIN
      </button>
    </header>
  );
};
