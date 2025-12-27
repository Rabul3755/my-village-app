import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminAuthAPI } from '../../services/api';

const AdminSettings = () => {
  const { admin, setAdmin } = useAdminAuth();

  // Local form states
  const [profile, setProfile] = useState({
    name: admin?.name || "",
    email: admin?.email || ""
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      setMsg({});

      const response = await adminAuthAPI.updateDetails(profile);

      setAdmin({ ...admin, ...profile });

      setMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMsg({ type: "error", text: error || "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) {
      return setMsg({ type: "error", text: "All password fields are required" });
    }

    if (passwords.newPass !== passwords.confirmPass) {
      return setMsg({ type: "error", text: "New passwords do not match" });
    }

    try {
      setLoading(true);
      setMsg({});

      await adminAuthAPI.updateDetails({
        currentPassword: passwords.current,
        newPassword: passwords.newPass
      });

      setMsg({ type: "success", text: "Password changed successfully!" });

      setPasswords({ current: "", newPass: "", confirmPass: "" });
    } catch (error) {
      setMsg({ type: "error", text: error || "Failed to change password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Settings</h1>
          <p className="text-gray-600">Update your details and manage account security</p>
        </div>
      </div>

      {/* Message Box */}
      {msg.text && (
        <div className={`p-3 rounded-md text-white ${msg.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h2>
            <div className="space-y-4">

              <div>
                <label className="block text-sm text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwords.confirmPass}
                    onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Change Password"}
              </button>

            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span>{new Date(admin.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Last login:</span>
                <span>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : "Never"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>

            <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded">Export Admin Logs</button>
            <button className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded">View Activity History</button>
            <button className="block w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded">Deactivate Account</button>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>

            <div className="text-sm space-y-2">
              <div className="flex justify-between"><span>Version</span><span>1.0.0</span></div>
              <div className="flex justify-between"><span>Last Updated</span><span>{new Date().toLocaleDateString()}</span></div>
              <div className="flex justify-between">
                <span>Support</span>
                <span className="text-blue-600">help@villageplatform.com</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
