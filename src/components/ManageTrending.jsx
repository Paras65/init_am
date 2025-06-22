import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageTrending.css";

const initialForm = { title: "", description: "", imageUrl: "", link: "" };

const ManageTrending = () => {
  const [trending, setTrending] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const toastId = useRef(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  api.interceptors.response.use(
    res => res,
    err => {
      toast.error("Server error, please try again."); 
      return Promise.reject(err);
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = ["title","description","imageUrl","link"].some(key => !form[key]);
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
        ? trending.map((t, i) => i === editingIndex ? item : t)
        : [...trending, item];

      setTrending(updatedList);
      toast.update(toastId.current, {
        render: editingIndex != null ? "Updated!" : "Added!",
        type: "success", isLoading: false, autoClose: 3000
      });

      setEditingIndex(null);
      setForm(initialForm);

    } catch (err) {
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
      setTrending(prev => prev.filter((_, i) => i !== idx));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div>
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
        {/* ... other nav links */}
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
        {editingIndex != null && <button type="button" onClick={() => { setForm(initialForm); setEditingIndex(null); }}>Cancel</button>}
      </form>

      <table className="manage-trending-table">
        {/* ... render rows */}
      </table>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageTrending;
