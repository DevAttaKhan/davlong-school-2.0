import Logo from "@/assets/images/logo.png";

export const CompanyInfo = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[530px] text-center px-0 sm:px-4">
        <div className="flex items-center justify-center mb-6 sm:mb-8 mt-6 sm:mt-8 md:mt-12">
          <img
            src={Logo}
            alt="Dave Long Coach Travel Logo"
            width={206}
            height={196}
            className="w-32 h-auto sm:w-40 md:w-48 lg:w-[206px] object-contain filter brightness-0 invert"
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 leading-tight">
            Coach Hire Company
          </h1>
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 leading-tight">
            West Cork
          </h1>
        </div>

        <p className="text-[#CBE0FD] text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto">
          Based in Skibbereen, Dave Long Coach Travel is West Cork's leading
          Coach & Mini Bus hire company. We pride ourselves on offering a wide
          range of coach and mini bus sizes to suit any group size or budget.
        </p>
      </div>
    </div>
  );
};
