import {
  BookingCTA,
  CompanyInfo,
  FeatureCards,
  HeroBanner,
} from "@/components/features/home";

export const HomePage = () => {
  return (
    <div className="min-h-screen relative bg-linear-to-b from-blue-500 to-blue-700 overflow-x-hidden">
      <HeroBanner />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-12">
        <CompanyInfo />

        <div className="flex mb-8 sm:mb-10 lg:mb-0 w-full">
          <div className="w-full max-w-[600px] text-center space-y-6 sm:space-y-10">
            <BookingCTA />
            <FeatureCards />
          </div>
        </div>
      </div>
    </div>
  );
};
