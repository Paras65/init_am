import { useEffect, useState } from "react";
import "./LiveDeals.css";

function LiveDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching real-time deals (replace with real API for production)
  useEffect(() => {
    const interval = setInterval(() => {
      // Example: Randomly generate some live deals
      setDeals([
        {
          id: 1,
          title: "🔥 50% OFF on Electronics",
          desc: "Limited time! Grab your favorite gadgets at half price.",
          expires: "Ends in 2h 15m"
        },
        {
          id: 2,
          title: "🎟️ Free Coupon: FASHION2025",
          desc: "Use this code for an extra 20% off on all fashion items.",
          expires: "Ends in 45m"
        },
        {
          id: 3,
          title: "🚚 Flash Sale: Free Shipping",
          desc: "No minimum order. Today only!",
          expires: "Ends in 1h 5m"
        }
      ]);
      setLoading(false);
    }, 5000); // Simulate updates every 5 seconds

    // Initial load
    setDeals([
      {
        id: 1,
        title: "🔥 50% OFF on Electronics",
        desc: "Limited time! Grab your favorite gadgets at half price.",
        expires: "Ends in 2h 15m"
      },
      {
        id: 2,
        title: "🎟️ Free Coupon: FASHION2025",
        desc: "Use this code for an extra 20% off on all fashion items.",
        expires: "Ends in 45m"
      },
      {
        id: 3,
        title: "🚚 Flash Sale: Free Shipping",
        desc: "No minimum order. Today only!",
        expires: "Ends in 1h 5m"
      }
    ]);
    setLoading(false);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-deals-section">
      <h3 className="live-deals-title">🟢 Ongoing Real-Time Free Coupons & Offers</h3>
      {loading ? (
        <div className="live-deals-loading">Loading live deals...</div>
      ) : (
        <ul className="live-deals-list">
          {deals.map(deal => (
            <li key={deal.id} className="live-deal-item">
              <div className="live-deal-main">
                <span className="live-deal-title">{deal.title}</span>
                <span className="live-deal-expires">{deal.expires}</span>
              </div>
              <div className="live-deal-desc">{deal.desc}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default LiveDeals;