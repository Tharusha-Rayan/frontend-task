import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    country: 'United States',
    postalCode: '10001'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const orderHistory = [
    { id: 1001, date: '2024-12-20', items: 3, total: 249.98, status: 'Delivered' },
    { id: 1002, date: '2024-11-15', items: 1, total: 899.99, status: 'Delivered' },
    { id: 1003, date: '2024-10-05', items: 5, total: 159.97, status: 'Delivered' }
  ];

  const activityLog = [
    { action: 'Logged in', timestamp: '2024-12-27 10:30 AM' },
    { action: 'Added Laptop Computer to cart', timestamp: '2024-12-26 03:15 PM' },
    { action: 'Updated profile information', timestamp: '2024-12-25 11:20 AM' },
    { action: 'Placed order #1003', timestamp: '2024-12-22 02:45 PM' }
  ];

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-layout">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2>{user.name}</h2>
              <p className="user-role">{user.role}</p>
              <button className="change-avatar-btn">Change Avatar</button>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">$2,450</span>
                <span className="stat-label">Total Spent</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">8</span>
                <span className="stat-label">Wishlist</span>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header">
                <h2>Personal Information</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="edit-btn">
                    Edit
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="info-grid">
                <div className="info-field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.name}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.email}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.phone}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Role</label>
                  <p>{user.role}</p>
                </div>

                <div className="info-field full-width">
                  <label>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.address}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.city}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.country}</p>
                  )}
                </div>

                <div className="info-field">
                  <label>Postal Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Order History</h2>
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className="status-badge status-delivered">
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="view-order-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="profile-section">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {activityLog.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">📋</div>
                    <div className="activity-details">
                      <p className="activity-action">{activity.action}</p>
                      <p className="activity-time">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;