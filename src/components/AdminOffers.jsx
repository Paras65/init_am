import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch offers from backend API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/offers`)
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-offers-container">
      <h2>Manage Offers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-offers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(offer => (
              <tr key={offer.id}>
                <td>{offer.id}</td>
                <td>{offer.title}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Add form/modal for adding/editing offers here */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/admin/offers" element={
        <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
          <AdminOffers />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;