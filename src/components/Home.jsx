import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="home-hero">
      <div className="home-hero-content">
        <h1>
          Welcome to <span className="brand">Init Free Offers Hub</span>
        </h1>
        <p className="home-subtitle">
          Discover trending deals, exclusive offers, and earn rewards. Your one-stop hub for premium savings!
        </p>
        <div className="home-actions">
          <Link to="/offers" className="home-btn primary">Browse Offers</Link>
          <Link to="/refer" className="home-btn">Refer & Earn</Link>
          <Link to="/products" className="home-btn">All Products</Link>
        </div>
      </div>
      <div className="home-quick-links">
        <Link to="/trending">🔥 Trending</Link>
        <Link to="/live-deals">⚡ Live Deals</Link>
        <Link to="/faq">❓ FAQ</Link>
        <Link to="/about">ℹ️ About</Link>
      </div>
    </section>
  );
}

export default Home;