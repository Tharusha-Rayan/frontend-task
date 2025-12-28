import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  KeyIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotions, setPromotions] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('America/New_York');

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setNewsletter(false);
    setDarkMode(false);
    setEmailNotifications(true);
    setSmsNotifications(false);
    setPromotions(true);
    setTwoFactor(false);
    setLanguage('English');
    setCurrency('USD');
    setTimeZone('America/New_York');
  };

  const handleChangePassword = () => {
    alert('Password change feature not implemented');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion feature not implemented');
    }
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          checked ? 'bg-primary-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-heading">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account preferences and application settings</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BellIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-600">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-1 divide-y divide-gray-200">
              <ToggleSwitch
                checked={notifications}
                onChange={setNotifications}
                label="Push Notifications"
                description="Receive push notifications on your devices"
              />
              <ToggleSwitch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                label="Email Notifications"
                description="Get notified via email about orders and updates"
              />
              <ToggleSwitch
                checked={smsNotifications}
                onChange={setSmsNotifications}
                label="SMS Notifications"
                description="Receive text messages for important updates"
              />
              <ToggleSwitch
                checked={promotions}
                onChange={setPromotions}
                label="Promotional Emails"
                description="Receive emails about sales and special offers"
              />
              <ToggleSwitch
                checked={newsletter}
                onChange={setNewsletter}
                label="Newsletter"
                description="Subscribe to our weekly newsletter"
              />
            </div>
          </div>

          {/* Privacy & Security Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Privacy & Security</h3>
                <p className="text-sm text-gray-600">Control your account security settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <ToggleSwitch
                checked={twoFactor}
                onChange={setTwoFactor}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />

              <div className="pt-4">
                <button
                  onClick={handleChangePassword}
                  className="flex items-center gap-3 w-full p-4 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <KeyIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <GlobeAltIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Preferences</h3>
                <p className="text-sm text-gray-600">Customize your experience</p>
              </div>
            </div>

            <div className="space-y-6">
              <ToggleSwitch
                checked={darkMode}
                onChange={setDarkMode}
                label="Dark Mode"
                description="Switch to dark theme (coming soon)"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-900">Danger Zone</h3>
                <p className="text-sm text-red-600">Irreversible actions</p>
              </div>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Delete Account
            </button>
            <p className="mt-2 text-sm text-gray-600 text-center">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSaveSettings}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={handleResetSettings}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
