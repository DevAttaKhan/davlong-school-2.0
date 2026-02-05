type SameStopsToggleProps = {
  /** Whether "use same stops" is on */
  checked: boolean;
  /** Called when the user toggles; receives the new value */
  onChange: (value: boolean) => void;
  /** When true, toggle and label are disabled (e.g. no outbound stops yet) */
  disabled?: boolean;
};

export const SameStopsToggle = ({
  checked,
  onChange,
  disabled = false,
}: SameStopsToggleProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-base font-semibold text-gray-900">
        Do you want to make extra stops on the way back?
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        You can add or remove stops for your return journey. Set how long
        you&apos;ll stay at each stop — or leave it at 0 minutes for a quick
        pick-up.
      </p>

      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          aria-checked={checked}
          role="switch"
          disabled={disabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            checked ? "bg-[#22C55E]" : "bg-gray-300"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={`text-left text-sm font-medium text-gray-900 ${
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:text-blue-600"
          }`}
        >
          Use the same stops as the way there
        </button>
      </div>
    </div>
  );
};
