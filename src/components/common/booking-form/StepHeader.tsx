import { X } from "lucide-react";
import { StepProgressBar } from "./StepProgressBar";

const BACK_BUTTON_CLASS =
  "text-blue-600 text-xs sm:text-sm hover:text-blue-700 transition-colors duration-200 px-1.5 sm:px-3 py-1.5 rounded-full border border-blue-600 bg-white";

const CANCEL_BUTTON_CLASS =
  "flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors";

type StepHeaderProps = {
  progressValue: number;
  onBack: () => void;
};

export const StepHeader = ({
  progressValue,
  onBack,
}: StepHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button type="button" onClick={onBack} className={BACK_BUTTON_CLASS}>
        <span className="hidden sm:inline">← Back</span>
        <span className="sm:hidden">←</span>
      </button>

      <StepProgressBar value={progressValue} />

      <button
        type="button"
        onClick={() => (window.location.href = "/")}
        className={CANCEL_BUTTON_CLASS}
      >
        <X className="w-4 h-4" />
        <span className="hidden sm:inline">Cancel</span>
      </button>
    </div>
  );
};
