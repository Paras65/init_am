import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManageProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [loading, setLoading] = useState(false);

  const adminName = localStorage.getItem("adminName") || "Admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.stock
    ) {
      toast.success("All fields are required.");
      return;
    }

    try {
      if (editingIndex !== null) {
        const productId = products[editingIndex]._id; // Ensure you're using the correct ID field
        await axios.put(`/api/products/${productId}`, {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
        toast.success("Product updated successfully.");
      } else {
        await axios.post("/api/products", {
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        });
        toast.success("Product added successfully.");
      }
      setForm(initialForm);
      setEditingIndex(null);
      fetchProducts();
    } catch (error) {
      toast.error("Error saving product:", error);
      toast.error("An error occurred while saving the product.");
    }
  };

  const handleEdit = (idx) => {
    setForm(products[idx]);
    setEditingIndex(idx);
  };

  const handleDelete = async (idx) => {
    if (toast.warn("Delete this product?")) {
      try {
        const productId = products[idx]._id; // Ensure you're using the correct ID field
        await axios.delete(`/api/products/${productId}`);
        toast.success("Product deleted successfully.");
        fetchProducts();
      } catch (error) {
        toast.error("Error deleting product:", error);
        toast.error("An error occurred while deleting the product.");
      }
    }
  };

  return (
    <d className="admin-product-container">
      <nav className="admin-nav">
        <Link to="/admin/dashboard" className="admin-nav-link">
          Dashboard
        </Link>
        <Link to="/admin/offers" className="admin-nav-link">
          Offers
        </Link>
        <Link to="/admin/products" className="admin-nav-link active">
          Products
        </Link>
        <Link to="/admin/trending" className="admin-nav-link">
          Trending
        </Link>
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

      {loading ? (
        <p>Loading products...</p>
      ) : (
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
                <tr key={p._id}> {/* Ensure you're using the correct ID field */}
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
      )}
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    
    </div>
  );
};

export default ManageProducts;
