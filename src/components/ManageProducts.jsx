import { useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import "./ManageProducts.css";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingIndex, setEditingIndex] = useState(null);

  // Example: Get admin name (replace with real logic as needed)
  const adminName = localStorage.getItem("adminName") || "Admin";

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.stock
    ) {
      alert("All fields are required.");
      return;
    }
    if (editingIndex !== null) {
      // Update
      const updated = [...products];
      updated[editingIndex] = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        createdAt: updated[editingIndex].createdAt,
      };
      setProducts(updated);
      setEditingIndex(null);
    } else {
      // Create
      setProducts([
        ...products,
        {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setForm(initialForm);
  };

  // Edit product
  const handleEdit = (idx) => {
    setForm(products[idx]);
    setEditingIndex(idx);
  };

  // Delete product
  const handleDelete = (idx) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((_, i) => i !== idx));
    }
  };

  return (
    <div>
      {/* Enhanced Admin Navigation Bar */}
      <nav className="admin-nav">
        <div style={{ fontWeight: "bold", fontSize: 18 }}>
          Welcome, {adminName}
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

      <h1 className="manage-products-title">Manage Products</h1>
      <form onSubmit={handleSubmit} className="manage-products-form">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
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
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
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
      <table className="manage-products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                No products
              </td>
            </tr>
          ) : (
            products.map((p, idx) => (
              <tr key={idx}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
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

export default ManageProducts;