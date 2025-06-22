import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageTrending.css";

const initialForm = { title: "", description: "", imageUrl: "", link: "" };

const ManageTrending = () => {
  const [trending, setTrending] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const toastId = useRef(null);

  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
  });
  api.interceptors.response.use(res => res, err => {
    toast.error("Server error, please try again.");
    return Promise.reject(err);
  });

  useEffect(() => {
    api.get("/trending")
      .then(res => setTrending(res.data))
      .catch(() => toast.error("Failed to load trending items."));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const missing = ["title","description","imageUrl","link"].some(k => !form[k]);
    if (missing) {
      if (!toast.isActive(toastId.current))
        toastId.current = toast.warn("Fill all fields.");
      return;
    }
    try {
      toastId.current = toast.loading("Saving...");
      const payload = { ...form };
      const resp = editingIndex != null
        ? await api.put(`/trending/${trending[editingIndex].id}`, payload)
        : await api.post("/trending", payload);
      const item = resp.data;
      const updatedList = editingIndex != null
        ? trending.map((t,i) => i === editingIndex ? item : t)
        : [...trending, item];
      setTrending(updatedList);
      toast.update(toastId.current, {
        render: editingIndex != null ? "Updated!" : "Added!",
        type: "success", isLoading: false, autoClose: 3000
      });
      setEditingIndex(null);
      setForm(initialForm);
    } catch {
      toast.update(toastId.current, {
        render: "Operation failed", type: "error", isLoading: false, autoClose: 5000
      });
    }
  };

  const handleEdit = idx => {
    setEditingIndex(idx);
    setForm(trending[idx]);
  };

  const handleDelete = async idx => {
    const item = trending[idx];
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await api.delete(`/trending/${item.id}`);
      setTrending(prev => prev.filter((_,i) => i !== idx));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
        <Link to="/admin/offers" className="admin-nav-link">Offers</Link>
        <Link to="/admin/products" className="admin-nav-link">Products</Link>
        <Link to="/admin/trending" className="admin-nav-link active">Trending</Link>
      </nav>

      <h1>Manage Trending</h1>
      <form onSubmit={handleSubmit} className="manage-trending-form">
        {["title","description","imageUrl","link"].map(name => (
          <input
            key={name}
            name={name}
            placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
            value={form[name]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit">{editingIndex != null ? "Update" : "Add"}</button>
        {editingIndex != null && (
          <button
            type="button"
            onClick={() => { setForm(initialForm); setEditingIndex(null); }}
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trending.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "1em" }}>
                No trending items yet.
              </td>
            </tr>
          ) : (
            trending.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                  ) : "—"}
                </td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <button type="button" onClick={() => handleEdit(idx)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(idx)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageTrending;
