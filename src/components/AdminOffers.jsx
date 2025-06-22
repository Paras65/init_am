import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Add this import
import './AdminOffers.css';
import { toast,ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    id: null
  });
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
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          discount: form.discount,
          startDate: form.startDate,
          endDate: form.endDate
        }),
      });
      if (!res.ok) throw new Error('Failed to save offer');
      const savedOffer = await res.json();
      toast.success(`Offer ${formMode === 'edit' ? 'updated' : 'added'} successfully.`);
      // Update offers list
      setForm({ title: '', description: '', discount: '', startDate: '', endDate: '', id: null });
      setFormMode('add');
      fetchOffers();
    } catch {
      toast.error('Failed to save offer.');
      setError('Failed to save offer.');
    }
    // Reset form and submitting state
    setSubmitting(false);
  };

  // Handle edit
  const handleEdit = (offer) => {
    setForm({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      startDate: offer.startDate ? offer.startDate.slice(0, 10) : '',
      endDate: offer.endDate ? offer.endDate.slice(0, 10) : '',
      id: offer.id || offer._id
    });
    
    setFormMode('edit');
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!toast.warn('Are you sure you want to delete this offer?')) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/offers/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete offer');
      toast.success('Offer deleted successfully.');
      fetchOffers();
    } catch {
      toast.error('Failed to delete offer.');
      setError('Failed to delete offer.');
    }
    setSubmitting(false);
  };

  return (
     <div className="admin-offers-container">
      {/* Admin Navigation */}
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
        <Link to="/admin/offers" className="admin-nav-link active">Offers</Link>
        <Link to="/admin/products" className="admin-nav-link">Products</Link>
        <Link to="/admin/trending" className="admin-nav-link">Trending</Link>
  
      </nav>
      <h2 className="admin-offers-title">Manage Offers</h2>
      {/* Add/Edit Offer Form */}
      <form className="admin-offers-form" onSubmit={handleSubmit}>
        <label htmlFor="offer-title">Title</label>
        <input
          id="offer-title"
          type="text"
          name="title"
          placeholder="Enter offer title"
          value={form.title}
          onChange={handleChange}
          minLength={3}
          maxLength={100}
          required
          className="admin-offers-input"
          disabled={submitting}
        />
        <br />
        <label htmlFor="offer-description">Description</label>
        <input
          id="offer-description"
          type="text"
          name="description"
          placeholder="Enter description"
          value={form.description || ''}
          onChange={handleChange}
          minLength={5}
          maxLength={200}
          required
          className="admin-offers-input"
          disabled={submitting}
        />
        <br />
        <label htmlFor="offer-discount">Discount (%)</label>
        <input
          id="offer-discount"
          type="number"
          name="discount"
          placeholder="Discount"
          value={form.discount || ''}
          onChange={handleChange}
          min={1}
          max={100}
          required
          className="admin-offers-input"
          disabled={submitting}
        />
        <br />
        <label htmlFor="offer-startDate">Start Date</label>
        <input
          id="offer-startDate"
          type="date"
          name="startDate"
          value={form.startDate || ''}
          onChange={handleChange}
          required
          className="admin-offers-input"
          disabled={submitting}
        />
        <br />
        <label htmlFor="offer-endDate">End Date</label>
        <input
          id="offer-endDate"
          type="date"
          name="endDate"
          value={form.endDate || ''}
          onChange={handleChange}
          required
          className="admin-offers-input"
          disabled={submitting}
        />
        <br />
        <button type="submit" className="admin-offers-save-btn" disabled={submitting}>
          {formMode === 'edit' ? 'Update Offer' : 'Add Offer'}
        </button>
        {formMode === 'edit' && (
          <>
            <span> </span>
            <button
              type="button"
              className="admin-offers-cancel-btn"
              onClick={() => {
                setForm({ title: '', description: '', discount: '', startDate: '', endDate: '', id: null });
                setFormMode('add');
              }}
              disabled={submitting}
            >
              Cancel
            </button>
          </>
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
              <th>Title & Description</th>
              <th>Discount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(offer => (
              <tr key={offer.id || offer._id}>
                <td data-label="ID">{offer.id || offer._id}</td>
                <td data-label="Title & Description">
                  <div style={{ fontWeight: 600 }}>{offer.title}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.97em', marginTop: 2 }}>{offer.description}</div>
                </td>
                <td data-label="Discount">{offer.discount}%</td>
                <td data-label="Start Date">{offer.startDate ? new Date(offer.startDate).toLocaleDateString() : ''}</td>
                <td data-label="End Date">{offer.endDate ? new Date(offer.endDate).toLocaleDateString() : ''}</td>
                <td data-label="Actions">
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
      {offers.length === 0 && !loading && (
        <p className="admin-offers-no-data">No offers available. Add a new offer to get started.</p>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
    </div>
  );
}

export default AdminOffers;