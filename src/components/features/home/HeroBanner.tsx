export const HeroBanner = () => {
  return (
    <div className="landing-banner min-h-[50vh] sm:min-h-[60vh] md:h-[70vh] lg:h-screen relative flex items-center justify-center py-12 sm:py-16">
      <div className="relative z-10 text-center px-4 sm:px-6 py-6 sm:py-8 rounded-2xl bg-black/50 backdrop-blur-sm">
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg tracking-tight leading-tight">
          Your Journey, Our Passion
        </h2>
        <p className="text-white/95 text-base sm:text-lg md:text-2xl mt-3 sm:mt-4 font-medium drop-shadow-md max-w-2xl mx-auto">
          Travel in comfort across West Cork — from 8 to 70 passengers
        </p>
      </div>
    </div>
  );
};
