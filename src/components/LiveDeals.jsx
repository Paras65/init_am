import { useEffect, useState } from "react";
import "./LiveDeals.css";

const defaultDeals = [
  {
    title: "Discount on an order 20% For all customers",
    description: "Get 20% off on your first order puzzle movies . Use code at checkout.",
    price_str: "ZG2sF",
    url: "https://dhwnh.com/g/kw0gg6zi0u0a0ff1a3c342f9f2178b/?i=31&erid=2bL9aMPo2e49hMef4rqUKxyp2t"
  },
 
];

// Use Vite env variables (must start with VITE_)
const ADMITAD_CLIENT_ID = import.meta.env.VITE_ADMITAD_CLIENT_ID;
const ADMITAD_CLIENT_SECRET = import.meta.env.VITE_ADMITAD_CLIENT_SECRET;
const ADMITAD_API_URL = import.meta.env.VITE_ADMITAD_API_URL;

async function fetchAdmitadDeals() {
  // 1. Get access token
  const tokenRes = await fetch("https://api.admitad.com/token/", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + btoa(`${ADMITAD_CLIENT_ID}:${ADMITAD_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("No access token");

  // 2. Fetch deals
  const dealsRes = await fetch(`${ADMITAD_API_URL}?limit=8`, {
    headers: {
      "Authorization": `Bearer ${tokenData.access_token}`
    }
  });
  const dealsData = await dealsRes.json();
  // 3. Map Admitad deals to your format
  return (dealsData.results || []).map(deal => ({
    title: deal.name || "Admitad Deal",
    description: deal.description || "",
    price_str: deal.campaign && deal.campaign.name,
    url: deal.goto_url
  }));
}

function LiveDealsCarousel() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const admitadDeals = await fetchAdmitadDeals();
        setDeals(admitadDeals.length ? admitadDeals : defaultDeals);
      } catch (e) {
        setDeals(defaultDeals);
      }
      setLoading(false);
    })();
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
            <div className="carousel-deal-desc">{deals[current].description}</div>
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