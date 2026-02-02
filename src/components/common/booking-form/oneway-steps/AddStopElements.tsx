import { AlarmClock, MapPinCheck, Trash2 } from "lucide-react";
import { type OneWayStopSchemaType } from "./schema";

const AddStopEdit = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <div className="relative ml-0" data-editing-stop>
      {/* Tooltip container */}
      <div
        className="bg-white border-2 rounded-lg p-4 shadow-lg relative w-[290px] sm:w-auto"
        style={{ borderColor: "#7A8D9E" }}
      >
        {/* Tooltip arrow pointing to timeline */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
          <div
            className="w-4 h-4 bg-white transform rotate-45"
            style={{
              borderLeft: "2px solid #7A8D9E",
              borderBottom: "2px solid #7A8D9E",
            }}
          ></div>
        </div>
        {/* Remove button - top right */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="Remove stop"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Main content - two columns */}
        <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 pr-6 sm:pr-8">
          {/* Left column: Stop location */}
          <div className="flex-[4] w-full space-y-2">
            <div className="text-base font-medium text-gray-700 leading-[140%] tracking-[-0.02em]">
              Stop location
            </div>
            <div className="text-xs text-gray-500">
              Exact address or Eircode
            </div>
            <input placeholder="Start typing an address or Eircode" />
          </div>

          {/* Right column: Duration */}
          <div className="w-full sm:w-40 space-y-2">
            <div className="text-base font-medium text-gray-700 leading-[140%] tracking-[-0.02em]">
              How long is the stop?
            </div>
            <div className="text-xs text-gray-500">0 min for pick-up only</div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-[10.5px] bg-white">
              <AlarmClock className="w-5 h-5 " />
              <input
                type="text"
                placeholder="0"
                className="flex-1 text-center text-base text-gray-900 font-normal focus:outline-none border-none bg-transparent min-w-0"
              />
              <span className="text-base text-gray-900 flex-shrink-0 ml-2">
                min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddedStopDisplay = () => {
  return (
    <div className="relative">
      {/* Pointer arrow pointing to timeline dot */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
        <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-r-blue-100"></div>
      </div>
      <div className="bg-blue-100 rounded-lg px-3 py-[14px] flex items-center justify-between gap-4">
        <div className="flex items-start space-x-2 flex-1 min-w-0">
          <MapPinCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm font-medium text-blue-900 break-words leading-tight line-clamp-2 flex-1 min-w-0">
            stop
          </span>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 mr-3 sm:ml-[45px]">
          <AlarmClock className="w-5 h-5 " />
          <span className="text-2sm text-black">123 min</span>
        </div>
        {/* Edit pin icon - visible on all screens */}
        <div className="ml-auto mr-3">
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            title="Edit stop"
          >
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

type Props = {
  stop: OneWayStopSchemaType;
  onRemove: () => void;
  index: number;
};

export const StopComposer: React.FC<Props> = ({ stop, onRemove, index }) => {
  return (
    <div className="flex-1">
      {stop.isEditing ? (
        <AddStopEdit onRemove={onRemove} index={index} />
      ) : (
        <AddedStopDisplay />
      )}
    </div>
  );
};
