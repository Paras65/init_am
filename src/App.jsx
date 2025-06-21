import { useState, useRef, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Notifications from './components/Notifications'
import SearchBar from './components/SearchBar'
import TrendingOffers from './components/TrendingOffers'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
import './components/Notifications.css'
import ProductOpt from './components/ProductOpt';
import VideoProductAd from './components/VideoProductAd';
import FAQ from './components/FAQ';
import About from './components/About';
import ReferAndEarn from './components/ReferAndEarn';
import LiveDeals from './components/LiveDeals';
import PrivacyPolicy from './components/PrivacyPolicy';
import Home from './components/Home';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminOffers from './components/AdminOffers';
import ManageProducts from "./components/ManageProducts";
import ManageTrending from "./components/ManageTrending";



function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "info"
  });
  const notificationTimeout = useRef();

  // Initialize from localStorage (token-based)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return !!localStorage.getItem("adminToken");
  });

  // Logout handler: clear token
  const handleAdminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminAuthenticated(false);
  };

  const handleAdminLogin = (token) => {
    setIsAdminAuthenticated(true);
    // Optionally: store token here if not already stored
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(""); // Reset category filter on new search
    setNotification({
      message: `Showing results for "${query}"`,
      type: "info"
    });
    if (notificationTimeout.current) clearTimeout(notificationTimeout.current);
    notificationTimeout.current = setTimeout(() => setNotification({ message: "", type: "info" }), 3000);
  };

  // Keep token validation on mount only
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;
      try {
        const res = await fetch("/api/admin/validate-token", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error();
        setIsAdminAuthenticated(true);
      } catch {
        localStorage.removeItem("adminToken");
        setIsAdminAuthenticated(false);
      }
    };
    checkToken();
    // Only run on mount
  }, []);

  return (
    <div className="app-container">
      <Header onCategorySelect={setSelectedCategory} />
      <Notifications
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/refer" element={<ReferAndEarn />} />
          <Route path="/live-deals" element={<LiveDeals />} />
          <Route path="/search" element={<SearchBar onSearch={handleSearch} />} />
          <Route path="/trending" element={<TrendingOffers />} />
          <Route path="/video-ad" element={
            <VideoProductAd
              videoUrl="https://a.impactradius-go.com/display-ad/7443-701707"
              title="Watch: Our Featured Product"
              description="See this product in action and discover its benefits!"
              ctaUrl="https://appsumo.8odi.net/c/2194403/701707/7443"
            />
          } />
          <Route path="/offers" element={<ProductOpt />} />
          <Route path="/products" element={
            <ProductList
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          } />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          {/* Admin routes */}
          <Route path="/admin/login" element={
            <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} setNotification={setNotification} />
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
              <AdminDashboard onLogout={handleAdminLogout} />
            </ProtectedRoute>
          } />
          <Route
            path="/admin/offers"
            element={
              <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                <AdminOffers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                <ManageProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trending"
            element={
              <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                <ManageTrending />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
