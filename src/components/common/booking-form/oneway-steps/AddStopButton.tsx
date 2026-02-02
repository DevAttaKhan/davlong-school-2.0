import { Plus } from "lucide-react";

type AddStopButtonProps = {
  onClick: () => void;
};

export const AddStopButton = ({ onClick }: AddStopButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-white rounded-lg px-3 py-[13px] flex items-center justify-center gap-3 cursor-pointer hover:bg-blue-50 transition-colors border border-dashed border-blue-500 hover:border-blue-700 flex-1"
  >
    <Plus className="w-4 h-4" />
    <span>Add Stop</span>
  </button>
);
