import { Dialog } from "@headlessui/react";

type NoStopsConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
};

export const NoStopsConfirmationDialog = ({
  isOpen,
  onClose,
  onProceed,
}: NoStopsConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Dialog container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm w-full bg-white rounded-2xl shadow-xl p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-3xl font-semibold text-gray-600">?</span>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-6">
            <Dialog.Title className="text-base font-bold text-gray-800 mb-2">
              You haven&apos;t selected any extra stops.
            </Dialog.Title>
            <p className="text-sm text-gray-700">Do you want to proceed?</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onProceed}
              className="flex-1 px-4 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Proceed
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
