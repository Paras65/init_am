import React from 'react';
import { Link } from 'react-router-dom';

import './AdminDashboard.css';

function AdminDashboard() {
  // Example stats (replace with real API data)
  const stats = [
    { label: 'Offers', value: 12, link: '/admin/offers' },
    { label: 'Products', value: 34, link: '/admin/products' },
    { label: 'Trending', value: 5, link: '/admin/trending' },
    
  ];

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <p className="admin-dashboard-welcome">Welcome, Admin!</p>
      <div className="admin-dashboard-stats">
        {stats.map(stat => (
          <Link to={stat.link} key={stat.label} className="admin-dashboard-card">
            <div className="admin-dashboard-card-value">{stat.value}</div>
            <div className="admin-dashboard-card-label">{stat.label}</div>
          </Link>
        ))}
      </div>
      <div className="admin-dashboard-actions">
        <Link to="/admin/offers" className="admin-dashboard-action-btn">Manage Offers</Link>
        <Link to="/admin/products" className="admin-dashboard-action-btn">Manage Products</Link>
        <Link to="/admin/trending" className="admin-dashboard-action-btn">Manage Trending</Link>
        {/* <Link to="/admin/contacts" className="admin-dashboard-action-btn">View Contacts</Link> */}
      </div>
      <button
        className="admin-dashboard-logout"
        onClick={() => {
           // Clear authentication data
  localStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminToken');
  // Redirect to login page without adding to history
  window.location.replace('/admin/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;