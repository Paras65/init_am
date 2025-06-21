import { useEffect, useState } from "react";
import "./ProductOpt.css";

function ProductOpt() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const MEDIA_PARTNER_ID = import.meta.env.VITE_IMPACT_MEDIA_PARTNER_ID;
    const API_KEY = import.meta.env.VITE_IMPACT_API_KEY;
    const CATALOG_ID = import.meta.env.VITE_IMPACT_CATALOG_ID;

    const IMPACT_API_URL = `https://${MEDIA_PARTNER_ID}:${API_KEY}@api.impact.com/Mediapartners/${MEDIA_PARTNER_ID}/Catalogs/${CATALOG_ID}`;

    fetch(IMPACT_API_URL, {
      headers: {
        "Accept": "application/json",
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        const mappedOffers = (data.Campaigns || []).map(item => ({
          id: item.CampaignId,
          name: item.Name,
          image: item.LogoUrl || "https://via.placeholder.com/80",
          link: item.WebsiteUrl || "#"
        }));
        setOffers(mappedOffers);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching Impact.com offers:", err);
        setError("Failed to load Impact.com offers.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="productopt-loading">Loading Impact.com offers...</div>;
  if (error) return <div className="productopt-error">{error}</div>;

  return (
    <section className="productopt-section">
      <h3 className="productopt-title">🌟 Impact.com Product Opts</h3>
      <ul className="productopt-list">
        {offers.map(offer => (
          <li key={offer.id} className="productopt-item">
            <a href={offer.link} className="productopt-link" target="_blank" rel="noopener noreferrer">
              <img src={offer.image} alt={offer.name} className="productopt-img" />
              <span>{offer.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductOpt;