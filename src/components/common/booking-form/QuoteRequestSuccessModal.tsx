import { Dialog } from "@headlessui/react";
import { CheckCircle } from "lucide-react";

type QuoteRequestSuccessModalProps = {
  isOpen: boolean;
  onBackToHome: () => void;
};

export const QuoteRequestSuccessModal = ({
  isOpen,
  onBackToHome,
}: QuoteRequestSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-green-50">
              <CheckCircle className="h-9 w-9 text-green-600" strokeWidth={2} />
            </div>
          </div>
          <Dialog.Title className="text-xl font-bold text-[#053373] mb-2">
            Your quote request has been sent!
          </Dialog.Title>
          <p className="text-sm text-gray-600 mb-6">
            We&apos;ll contact you soon to confirm your booking and next steps.
          </p>
          <button
            type="button"
            onClick={onBackToHome}
            className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
