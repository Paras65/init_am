import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageTrending.css";

const initialForm = {
  title: "",
  description: "",
  imageUrl: "",
  link: "",
};

const ManageTrending = () => {
  const [trending, setTrending] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update trending item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.imageUrl || !form.link) {
      alert("All fields are required.");
      return;
    }
    if (editingIndex !== null) {
      // Update
      const updated = [...trending];
      updated[editingIndex] = {
        ...form,
        createdAt: updated[editingIndex].createdAt,
      };
      setTrending(updated);
      setEditingIndex(null);
    } else {
      // Create
      setTrending([
        ...trending,
        {
          ...form,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setForm(initialForm);
  };

  // Edit trending item
  const handleEdit = (idx) => {
    setForm(trending[idx]);
    setEditingIndex(idx);
  };

  // Delete trending item
  const handleDelete = (idx) => {
    if (window.confirm("Delete this trending item?")) {
      setTrending(trending.filter((_, i) => i !== idx));
    }
  };

  return (
    <div>
        <nav className="admin-nav">
        <div style={{ fontWeight: "bold", fontSize: 18 }}>
          Welcome,
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <Link to="/admin/dashboard" className="admin-nav-link">
            Dashboard
          </Link>
          <Link to="/admin/offers" className="admin-nav-link active">
            Offers
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            Products
          </Link>
          <Link to="/admin/trending" className="admin-nav-link">
            Trending
          </Link>
          <Link to="/admin/contacts" className="admin-nav-link">
            Contacts
          </Link>
        </div>
      </nav>
      <h1 className="manage-trending-title">Manage Trending</h1>
      <form onSubmit={handleSubmit} className="manage-trending-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
        <input
          name="link"
          placeholder="Link"
          value={form.link}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingIndex !== null ? "Update" : "Add"}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setEditingIndex(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="manage-trending-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Link</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trending.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>No trending items</td>
            </tr>
          ) : (
            trending.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <img src={item.imageUrl} alt={item.title} />
                </td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTrending;