import React, { useContext } from "react";
import { UserDataContextInfo } from "@/contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const {userData} = useContext(UserDataContextInfo);
  const {isLogedIn} = useContext(UserDataContextInfo);
  if(!isLogedIn){
    navigate("/login");
  }
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white p-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">

          {/* Profile */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4">
              Profile Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <p
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
              >{userData.name}</p>

              <p
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
              >{userData.email}</p>

              <p
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
              >{userData.phoneNumber}</p>

              <p
                className="bg-zinc-900 border border-zinc-700 rounded-xl p-3"
              >{userData.kycVerified? "KYC Verified":"KYC Not Verified"}</p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4">
              Security
            </h2>

            <div className="space-y-4">
              <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl flex justify-between">
                Change Password <p className="text-gray-500 inline">(Coming Soon)</p>
              </button>

              <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl flex justify-between">
                Enable Two-Factor Authentication <p className="text-gray-500 inline">(Coming Soon)</p>
              </button>

              <button className="w-full text-left bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl flex justify-between">
                View Login History <p className="text-gray-500 inline">(Coming Soon)</p>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4">
              Notifications
            </h2>

            <div className="space-y-4">
              <label className="flex justify-between">
                <span>Transaction Alerts</span>
                <p type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Email Notifications</span>
                <p type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Marketing Emails</span>
                <p type="checkbox" />
              </label>
            </div>
          </div>

          {/* Theme */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold mb-4">
              Appearance
            </h2>

            <select className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3">
              <option>Dark Theme</option>
              <option>Light Theme</option>
              <option>System Default</option>
            </select>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Danger Zone
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl">
                Delete Account
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl">
                Logout
              </button>
            </div>
          </div>

          {/* Save */}
          <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 py-4 rounded-2xl font-semibold hover:scale-[1.01] transition">
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default Settings;