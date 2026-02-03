import { Users, Pencil } from "lucide-react";

type PassengersSectionProps = {
  teachersCount?: number;
  studentsCount?: number;
  onEdit?: () => void;
};

export const PassengersSection = ({
  teachersCount = 0,
  studentsCount = 0,
  onEdit,
}: PassengersSectionProps) => {
  const totalPassengers = teachersCount + studentsCount;

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-600">Passengers</h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="flex items-start gap-6">
        <div className="bg-gray-100 rounded-lg px-6 py-4">
          <p className="text-xs text-gray-500 uppercase mb-1">
            TOTAL PASSENGERS
          </p>
          <p className="text-3xl font-bold text-gray-900">{totalPassengers}</p>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500 uppercase">TEACHERS</p>
            <p className="text-lg font-semibold text-gray-900">
              {teachersCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">STUDENTS</p>
            <p className="text-lg font-semibold text-gray-900">
              {studentsCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
