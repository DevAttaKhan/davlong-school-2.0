import { Shield, Bolt, Headphones } from "lucide-react";

export const FeatureIconsSection = () => {
  return (
    <div className="flex items-center justify-center gap-8 pt-4">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-600" />
        <span className="text-sm text-gray-700">Secure Payment</span>
      </div>
      <div className="flex items-center gap-3">
        <Bolt className="w-6 h-6 text-blue-600" />
        <span className="text-sm text-gray-700">Instant Confirmation</span>
      </div>
      <div className="flex items-center gap-3">
        <Headphones className="w-6 h-6 text-blue-600" />
        <span className="text-sm text-gray-700">24/7 Support</span>
      </div>
    </div>
  );
};
