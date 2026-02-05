import { AddressInput } from "@/components/common/AddressInput";

type EditableLocationCardProps = {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  placeholder?: string;
  error?: string;
};

export const EditableLocationCard = ({
  title,
  subtitle,
  value,
  onChange,
  onCancel,
  onSave,
  placeholder = "Enter address or Eircode...",
  error,
}: EditableLocationCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="space-y-2 mb-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="mb-4">
        <AddressInput
          value={value}
          onChange={(value) => onChange(value)}
          placeholder={placeholder}
          error={error}
          inputClassName="py-2.5"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};
