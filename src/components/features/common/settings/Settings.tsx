import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Settings = () => {
  // Mock User Data
  const user = {
    name: "admin school",
    email: "admin@davelongcoachtravel.ie",
    role: "Owner",
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="p-4 sm:p-6 max-w-4xl">
      {/* Profile Details */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Profile Details
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 items-center">
            <span className="text-xs font-bold text-gray-500 uppercase">
              NAME
            </span>
            <span className="text-gray-900 font-medium">{user.name}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 items-center">
            <span className="text-xs font-bold text-gray-500 uppercase">
              EMAIL
            </span>
            <span className="text-blue-600 font-medium">{user.email}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 items-center">
            <span className="text-xs font-bold text-gray-500 uppercase">
              ROLE
            </span>
            <span className="text-gray-900 font-medium">{user.role}</span>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Change Password
        </h2>
        <div className="space-y-6 max-w-md">
          {/* Current Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                {showNewPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              • At least{" "}
              <span className="font-semibold">8 characters long</span>{" "}
              (preferably 12+ for extra security)
            </p>
            <p>
              • Includes both{" "}
              <span className="font-semibold">uppercase and lowercase</span>{" "}
              letters
            </p>
            <p>
              • Contains at least{" "}
              <span className="font-semibold">one number</span> (0-9)
            </p>
            <p>
              • At least{" "}
              <span className="font-semibold">one special character</span>{" "}
              (e.g., !@#$%^&*)
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button className="px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Save Password
          </button>
        </div>
      </section>
    </div>
  );
};
