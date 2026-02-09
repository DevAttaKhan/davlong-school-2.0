import { Send } from "lucide-react";

type PrivacyAndSubmitSectionProps = {
  privacyAgreed: boolean;
  onPrivacyChange: (agreed: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export const PrivacyAndSubmitSection = ({
  privacyAgreed,
  onPrivacyChange,
  onSubmit,
  isSubmitting = false,
}: PrivacyAndSubmitSectionProps) => {
  return (
    <>
      {/* Privacy Policy Checkbox */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy-policy"
            checked={privacyAgreed}
            onChange={(e) => onPrivacyChange(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="privacy-policy"
            className="text-sm text-gray-700 cursor-pointer"
          >
            I agree that my personal data will be processed according to the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </label>
        </div>
      </div>

      {/* Send Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!privacyAgreed || isSubmitting}
          className={`py-3 px-6 rounded-full font-normal flex items-center justify-center gap-2 transition-colors ${
            privacyAgreed
              ? "bg-[#15803D] text-white hover:bg-[#0f6b2f]"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          <span>{isSubmitting ? "Sending…" : "Send My Quote Request"}</span>
          <Send className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
