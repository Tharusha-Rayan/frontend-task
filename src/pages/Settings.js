import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Settings.css';

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

  return (
    <div>
      <Navbar />
      <div className="settings-container">
        <h1>Settings</h1>

        <div className="settings-layout">
          <div className="settings-sidebar">
            <div className="settings-menu">
              <button className="menu-item active">General</button>
              <button className="menu-item">Notifications</button>
              <button className="menu-item">Security</button>
              <button className="menu-item">Preferences</button>
            </div>
          </div>

          <div className="settings-main">
            <div className="settings-section">
              <h2>General Settings</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Enable Notifications</label>
                    <p className="setting-description">Receive notifications about your orders and updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Subscribe to Newsletter</label>
                    <p className="setting-description">Get the latest news, updates, and special offers</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Dark Mode</label>
                    <p className="setting-description">Switch to dark theme for better viewing at night</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Email Notifications</label>
                    <p className="setting-description">Receive order updates and promotions via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>SMS Notifications</label>
                    <p className="setting-description">Get order updates via text message</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={smsNotifications}
                      onChange={(e) => setSmsNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Promotional Offers</label>
                    <p className="setting-description">Receive exclusive deals and discounts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={promotions}
                      onChange={(e) => setPromotions(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h2>Security Settings</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Two-Factor Authentication</label>
                    <p className="setting-description">Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={(e) => setTwoFactor(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Change Password</label>
                    <p className="setting-description">Update your account password</p>
                  </div>
                  <button onClick={handleChangePassword} className="secondary-btn">
                    Change
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h2>Preferences</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Language</label>
                    <p className="setting-description">Select your preferred language</p>
                  </div>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="setting-select">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Currency</label>
                    <p className="setting-description">Choose your preferred currency</p>
                  </div>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="setting-select">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </select>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <label>Time Zone</label>
                    <p className="setting-description">Set your local time zone</p>
                  </div>
                  <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} className="setting-select">
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section danger-zone">
              <h2>Danger Zone</h2>
              <div className="settings-group">
                <div className="setting-item">
                  <div className="setting-info">
                    <label>Delete Account</label>
                    <p className="setting-description">Permanently delete your account and all data</p>
                  </div>
                  <button onClick={handleDeleteAccount} className="danger-btn">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button onClick={handleSaveSettings} className="save-btn">
                Save All Settings
              </button>
              <button onClick={handleResetSettings} className="reset-btn">
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;