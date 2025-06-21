import { useEffect, useState } from "react";
import "./LiveDeals.css";

const defaultDeals = [
  {
    title: "🎟️ Default Coupon: SAVE20",
    description: "Get 20% off on your first order. Use code at checkout.",
    price_str: "No minimum spend",
    url: "#"
  },
  {
    title: "🔥 Default Offer: Free Shipping",
    description: "Enjoy free shipping on all orders above ₹499.",
    price_str: "Valid sitewide",
    url: "#"
  },
  {
    title: "💥 Default Flash Sale",
    description: "Up to 60% off on select electronics. Limited time only!",
    price_str: "Hurry, ends soon!",
    url: "#"
  }
];

function LiveDealsCarousel() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/api/live-deals")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDeals(data.slice(0, 8));
        } else {
          setDeals(defaultDeals);
        }
        setLoading(false);
      })
      .catch(() => {
        setDeals(defaultDeals);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!deals.length) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % deals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [deals]);

  const prevDeal = () => setCurrent(current === 0 ? deals.length - 1 : current - 1);
  const nextDeal = () => setCurrent((current + 1) % deals.length);

  return (
    <section className="live-deals-carousel-section">
      <h3 className="live-deals-carousel-title">🟢 Ongoing Real-Time Free Coupons & Offers</h3>
      {loading ? (
        <div className="live-deals-carousel-loading">Loading live deals...</div>
      ) : deals.length ? (
        <div className="live-deals-carousel">
          <button
            className="carousel-arrow left"
            onClick={prevDeal}
            aria-label="Previous deal"
          >
            &#8592;
          </button>
          <div className="carousel-slide">
            <div className="carousel-deal-title">{deals[current].title}</div>
            <div className="carousel-deal-desc">{deals[current].description || deals[current].desc}</div>
            <div className="carousel-deal-footer">
              {deals[current].price_str && (
                <span className="carousel-deal-price">{deals[current].price_str}</span>
              )}
              {deals[current].url && (
                <a
                  href={deals[current].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-deal-link"
                >
                  View Deal
                </a>
              )}
            </div>
          </div>
          <button
            className="carousel-arrow right"
            onClick={nextDeal}
            aria-label="Next deal"
          >
            &#8594;
          </button>
        </div>
      ) : (
        <div className="live-deals-carousel-empty">No live deals found.</div>
      )}
      <div className="carousel-dots">
        {deals.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot${idx === current ? " active" : ""}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to deal ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default LiveDealsCarousel;