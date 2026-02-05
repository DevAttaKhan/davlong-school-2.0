import { BookingForm } from "@/components/common/booking-form";
import { Header } from "@/components/common";

export const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      <Header />
      <div className="flex-1">
        <BookingForm />
      </div>
    </div>
  );
};
