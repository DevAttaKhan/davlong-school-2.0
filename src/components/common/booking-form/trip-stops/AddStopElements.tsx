import { AlarmClock, MapPinCheck, Pencil, Trash2 } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { AddressInput } from "../../AddressInput";
import type { LeadSchemaType } from "../oneway-steps/schema";

type AddStopEditProps = {
  fieldPrefix: `outbound_trip.trip_stops.${number}` | `return_trip.trip_stops.${number}`;
  onRemove: () => void;
  onDone: () => void;
};

const AddStopEdit = ({ fieldPrefix, onRemove, onDone }: AddStopEditProps) => {
  const { control } = useFormContext<LeadSchemaType>();

  return (
    <div className="relative ml-0" data-editing-stop>
      <div className="bg-white border-2 border-gray-400 rounded-lg p-4 shadow-lg relative w-full min-w-0">
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Remove stop"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pr-8 sm:pr-8">
          <div className="flex-[4] w-full space-y-2 min-w-0">
            <div className="text-base font-medium text-gray-700">
              Stop location
            </div>
            <div className="text-xs text-gray-500">
              Exact address or Eircode
            </div>
            <Controller
              name={`${fieldPrefix}.location`}
              control={control}
              render={({ field, fieldState }) => (
                <AddressInput
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={fieldState.error?.message}
                  placeholder="Start typing an address or Eircode"
                  inputClassName="py-2.5"
                />
              )}
            />
          </div>

          <div className="w-full sm:w-40 space-y-2">
            <div className="text-base font-medium text-gray-700">
              How long is the stop?
            </div>
            <div className="text-xs text-gray-500">0 min for pick-up only</div>
            <Controller
              name={`${fieldPrefix}.estimated_time`}
              control={control}
              render={({ field }) => (
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 bg-white">
                  <AlarmClock className="w-5 h-5 text-gray-500 shrink-0" />
                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    className="flex-1 text-center text-base text-gray-900 font-normal focus:outline-none border-none bg-transparent min-w-0"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
                  />
                  <span className="text-base text-gray-900 shrink-0 ml-2">
                    min
                  </span>
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={onDone}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

type AddedStopDisplayProps = {
  location: string;
  estimatedTime: number;
  onEdit: () => void;
};

const AddedStopDisplay = ({
  location,
  estimatedTime,
  onEdit,
}: AddedStopDisplayProps) => {
  return (
    <div className="relative flex-1 min-w-0">
      <div className="bg-blue-50 rounded-lg px-3 py-3.5 flex items-center justify-between gap-4 border border-blue-100">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <MapPinCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span className="text-sm font-medium text-blue-900 break-words leading-tight line-clamp-2 flex-1 min-w-0">
            {location || "Stop location"}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <AlarmClock className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700">{estimatedTime} min</span>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors shrink-0"
          title="Edit stop"
        >
          <Pencil className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

type StopComposerProps = {
  index: number;
  onRemove: () => void;
  tripPath?: "outbound_trip.trip_stops" | "return_trip.trip_stops";
};

export const StopComposer = ({ index, onRemove, tripPath = "outbound_trip.trip_stops" }: StopComposerProps) => {
  const { watch, setValue } = useFormContext<LeadSchemaType>();
  const fieldPrefix = `${tripPath}.${index}` as const;

  const stop = watch(fieldPrefix);
  const isEditing = stop?.isEditing ?? true;

  const handleEdit = () => {
    setValue(`${fieldPrefix}.isEditing`, true);
  };

  const handleDone = () => {
    setValue(`${fieldPrefix}.isEditing`, false);
  };

  return (
    <div className="flex-1 min-w-0">
      {isEditing ? (
        <AddStopEdit
          fieldPrefix={fieldPrefix}
          onRemove={onRemove}
          onDone={handleDone}
        />
      ) : (
        <AddedStopDisplay
          location={stop?.location ?? ""}
          estimatedTime={stop?.estimated_time ?? 0}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};