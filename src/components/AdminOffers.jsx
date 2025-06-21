import React, { useEffect, useState } from 'react';
import './AdminOffers.css';

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', id: null });
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [submitting, setSubmitting] = useState(false);

  // Fetch offers from backend API
  const fetchOffers = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/offers`)
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load offers.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add/edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const url = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/offers${formMode === 'edit' ? `/${form.id}` : ''}`;
      const method = formMode === 'edit' ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title }),
      });
      if (!res.ok) throw new Error('Failed to save offer');
      setForm({ title: '', id: null });
      setFormMode('add');
      fetchOffers();
    } catch {
      setError('Failed to save offer.');
    }
    setSubmitting(false);
  };

  // Handle edit
  const handleEdit = (offer) => {
    setForm({ title: offer.title, id: offer.id || offer._id });
    setFormMode('edit');
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/offers/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete offer');
      fetchOffers();
    } catch {
      setError('Failed to delete offer.');
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-offers-container">
      <h2 className="admin-offers-title">Manage Offers</h2>
      {/* Add/Edit Offer Form */}
      <form className="admin-offers-form" onSubmit={handleSubmit}>
        <label htmlFor="offer-title" style={{ fontWeight: 500, marginRight: 8 }}>
          Offer Title
        </label>
        <input
          id="offer-title"
          type="text"
          name="title"
          placeholder="Enter a descriptive offer title"
          value={form.title}
          onChange={handleChange}
          minLength={3}
          maxLength={100}
          required
          disabled={submitting}
          className="admin-offers-input"
          style={{ flex: 1 }}
        />
        <button type="submit" className="admin-offers-save-btn" disabled={submitting}>
          {formMode === 'edit' ? 'Update Offer' : 'Add Offer'}
        </button>
        {formMode === 'edit' && (
          <button
            type="button"
            className="admin-offers-cancel-btn"
            onClick={() => {
              setForm({ title: '', id: null });
              setFormMode('add');
            }}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </form>
      {loading ? (
        <p className="admin-offers-loading">Loading...</p>
      ) : error ? (
        <p className="admin-offers-error">{error}</p>
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
              <tr key={offer.id || offer._id}>
                <td>{offer.id || offer._id}</td>
                <td>{offer.title}</td>
                <td>
                  <button
                    className="admin-offers-edit-btn"
                    onClick={() => handleEdit(offer)}
                    disabled={submitting}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-offers-delete-btn"
                    onClick={() => handleDelete(offer.id || offer._id)}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOffers;