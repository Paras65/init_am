/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManageProducts.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";


const initialForm = {
  name: "",
  imageURL: "",
  link: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csvFile, setCsvFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      // Log the detailed error for developers, show a user-friendly message
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.imageURL ||
      !form.link ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.stock
    ) {
      toast.warn("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
    
        await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${editingId}`, productData);
        toast.success("Product updated successfully.");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, productData);
        toast.success("Product added successfully.");
      }
      handleCancelEdit(); // Reset form and editing state
      await fetchProducts(); // Refetch to show the latest data
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("An error occurred while saving the product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      imageURL: product.imageURL,
      link: product.link,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        toast.success("Product deleted successfully.");
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("An error occurred while deleting the product.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      setCsvFile(null);
      return;
    }
    setCsvFile(e.target.files[0]);
  };

  const handleCsvUpload = () => {
    if (!csvFile) {
      toast.warn("Please select a CSV file.");
      return;
    }

    setIsUploading(true);
    const requiredHeaders = [
      "name",
      "imageURL",
      "link",
      "description",
      "price",
      "category",
      "stock",
    ];

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        // Client-side header validation
        const fileHeaders = results.meta.fields;
        const missingHeaders = requiredHeaders.filter(
          (header) => !fileHeaders.includes(header)
        );

        if (missingHeaders.length > 0) {
          toast.error(`CSV file is missing required headers: ${missingHeaders.join(", ")}`);
          setIsUploading(false);
          return;
        }

        if (results.errors.length) {
          toast.error("Error parsing CSV file. Please check the format.");
          setIsUploading(false);
          return;
        }

        const newProducts = results.data.map((p) => ({
          ...p,
          price: Number(p.price),
          stock: Number(p.stock),
        }));

        if (newProducts.length === 0) {
          toast.warn("CSV file is empty or contains no valid product rows.");
          setIsUploading(false);
          return;
        }

        try {
          // NOTE: This assumes your backend has an endpoint to handle bulk creation.
          await axios.post(`${import.meta.env.VITE_API_URL}/api/products/csv`, { products: newProducts });
          toast.success(`${newProducts.length} products uploaded successfully!`);
          await fetchProducts();
          setCsvFile(null); // Reset file input
        } catch (error) {
          console.error("Error during bulk upload:", error);
          toast.error(error.response?.data?.message || "An error occurred during bulk upload.");
        } finally {
          setIsUploading(false);
        }
      },
      error: () => {
        toast.error("Failed to read the CSV file.");
        setIsUploading(false);
      },
    });
  };

  return (
    <div className="admin-product-container">
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
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="csv-upload-section">
        <h2 className="csv-upload-title">Add Products via CSV</h2>
        <p className="csv-instructions">
          Upload a CSV file with headers: name,, imageURL, link, description, price, category, stock.
        </p>
        <div className="csv-upload-form">
          <label htmlFor="csv-file-input" className="csv-upload-label">
            {csvFile ? csvFile.name : "Choose a file..."}
          </label>
          <input
            id="csv-file-input"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            // Use a key to reset the input when the file is cleared
            key={csvFile ? csvFile.name : "file-input"}
          />
          <button className="csv-upload-button" onClick={handleCsvUpload} disabled={isUploading || !csvFile}>
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="manage-products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image URL</th>
              <th>Link</th>
              <th>Price</th>
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
                  <td>{p.imageURL}</td>
                  <td><a href={p.link} target="_blank" rel="noopener noreferrer">View</a></td>
                  <td>{p.price}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(p._id)}
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
