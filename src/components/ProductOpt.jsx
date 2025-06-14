import { useEffect, useState } from "react";
import "./ProductOpt.css";

function ProductOpt() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the correct API version and endpoint
    const MEDIA_PARTNER_ID = "IR6bnDc2sazE2194403ocVmSCWnvvDsiX1"; // Not Account SID!
    const API_KEY = ".kvcJbQby32ozX~AQNvuVZyUCNuHKWMF";
    const IMPACT_API_URL = `https://IR6bnDc2sazE2194403ocVmSCWnvvDsiX1:.kvcJbQby32ozX~AQNvuVZyUCNuHKWMF@api.impact.com/Mediapartners/${MEDIA_PARTNER_ID}/Catalogs/3909`;

    //https://IR6bnDc2sazE2194403ocVmSCWnvvDsiX1:.kvcJbQby32ozX~AQNvuVZyUCNuHKWMF@api.impact.com/Mediapartners/IR6bnDc2sazE2194403ocVmSCWnvvDsiX1/Catalogs/3903/


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
        // Adjust mapping based on actual API response structure
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