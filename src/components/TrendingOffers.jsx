import React, { useEffect, useState } from "react";
import "./TrendingOffers.css";

const defaultOffers =[
  {
    id: 1,
    name: "50% Off Summer Fashion",
    image: "https://assets.corsair.com/image/upload/c_pad%2Cq_auto%2Ch_515%2Cw_515/products/Gaming-Headsets/CA-9011280-AP/HS55-WIRELESS-Gaming-Headset-_-Carbon-_AP_-0.webp",
    link: "https://go.corsair.com/c/2194403/497986/8513?prodsku=CA-9011280-NA-RV&u=https%3A%2F%2Fwww.corsair.com%2Fus%2Fen%2Fp%2Frevival-series%2FCA-9011280-NA-RV%2Fhs55-wireless-gaming-headset-carbon-revival-series-ca-9011280-na-rv&intsrc=APIG_3903"
  },
  {
    id: 2,
    name: "Top Electronics Deals",
    image: "https://p1-ofp.static.pub//fes/cms/2025/02/28/e8ul5q65h6lygblsvd5vx4iwlsf9u4401680.png",
    link: "https://lenovo-in.zlvv.net/c/2194403/608695/9634?prodsku=83JRCTO1WWIN1&u=https%3A%2F%2Fwww.lenovo.com%2Fin%2Fen%2Fp%2Flaptops%2Fyoga%2Fyoga-2-in-1-series%2Flenovo-yoga-7-2-in-1-gen-10-14-inch-amd%2F83jrcto1wwin1%3Fcid%3Din%3Aseo%3A9w15ig&intsrc=APIG_4639"
  },
  {
    id: 3,
    name: "Limited offer: up to 67% off your perfect .co domain",
    image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjQ0LjQiIHkxPSI0Ni43MiIgeDI9IjU5LjAxIiB5Mj0iMTUuMzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNkNDIwMmMiLz48c3RvcCBvZmZzZXQ9Ii4xIiBzdG9wLWNvbG9yPSIjZGMzZDI5IiBzdG9wLW9wYWNpdHk9Ii43OSIvPjxzdG9wIG9mZnNldD0iLjIiIHN0b3AtY29sb3I9IiNlNDU5MjYiIHN0b3Atb3BhY2l0eT0iLjU4Ii8+PHN0b3Agb2Zmc2V0PSIuMzIiIHN0b3AtY29sb3I9IiNlYjcxMjMiIHN0b3Atb3BhY2l0eT0iLjQiLz48c3RvcCBvZmZzZXQ9Ii40MyIgc3RvcC1jb2xvcj0iI2YwODUyMSIgc3RvcC1vcGFjaXR5PSIuMjUiLz48c3RvcCBvZmZzZXQ9Ii41NSIgc3RvcC1jb2xvcj0iI2Y1OTQxZiIgc3RvcC1vcGFjaXR5PSIuMTQiLz48c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iI2Y4OWYxZSIgc3RvcC1vcGFjaXR5PSIuMDYiLz48c3RvcCBvZmZzZXQ9Ii44MiIgc3RvcC1jb2xvcj0iI2Y5YTUxZCIgc3RvcC1vcGFjaXR5PSIuMDIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYWE3MWQiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTY2Ny45MSIgeTE9IjkzNy4zMiIgeDI9IjE2ODIuNTIiIHkyPSI5MDUuOTgiIGdyYWRpZW50VHJhbnNmb3JtPSJyb3RhdGUoMTgwIDg0My43NSA0NzcuMykiIHhsaW5rOmhyZWY9IiNhIi8+PC9kZWZzPjxwYXRoIGQ9Ik01Ni45MyAxNWE1LjcgNS43IDAgMCAwLTUgM2wtLjEzLjIzLTQuNSA4Ljg4LTUuNyAxMS4yMiAzLjczIDcuMzUuMjEuNDFBNS44MyA1LjgzIDAgMCAwIDQ4IDQ4LjRhNS44MyA1LjgzIDAgMCAwIDIuNDktMi4zNWwuMi0uNDEgMTEuMi0yMiAuMjctLjUzYTUuNjEgNS42MSAwIDAgMCAuNDktMi4zMkE1Ljc0IDUuNzQgMCAwIDAgNTYuOTMgMTV6TTIyLjM5IDI1LjY4bC0zLjcyLTcuMzItLjIxLS4zNkE1Ljg2IDUuODYgMCAwIDAgMTYgMTUuNmE1Ljg4IDUuODggMCAwIDAtMi41MSAyLjRsLS4yLjQtMTEuMiAyMi4wMS0uMjcuNTNBNS43NCA1Ljc0IDAgMCAwIDEyLjA5IDQ2bC4xMi0uMjMgNC41MS04Ljg4IDUuNjktMTEuMjF6IiBmaWxsPSIjZmY1MTAwIi8+PHBhdGggZD0iTTU2LjkyIDE1YTUuNzMgNS43MyAwIDAgMC01IDNsLS4xMi4yMy00LjUgOC44OC01LjcgMTEuMjIgMy43MyA3LjM1LjIxLjQxQTUuODMgNS44MyAwIDAgMCA0OCA0OC40YTUuODggNS44OCAwIDAgMCAyLjQ5LTIuMzVsLjItLjQxIDExLjItMjIgLjI3LS41M2E1LjYxIDUuNjEgMCAwIDAgLjQ5LTIuMzJBNS43NCA1Ljc0IDAgMCAwIDU2LjkyIDE1eiIgZmlsbD0idXJsKCNhKSIvPjxwYXRoIGQ9Ik03LjA3IDQ5YTUuNzEgNS43MSAwIDAgMCA1LTNsLjEyLS4yMyA0LjUxLTguODggNS43LTExLjIyLTMuNzMtNy4zNS0uMi0uMzJBNS44MyA1LjgzIDAgMCAwIDE2IDE1LjZhNS43NyA1Ljc3IDAgMCAwLTIuNTEgMi40bC0uMjEuNDEtMTEuMTkgMjItLjI3LjUzYTUuNjEgNS42MSAwIDAgMC0uNDkgMi4zMkE1Ljc0IDUuNzQgMCAwIDAgNy4wNyA0OXoiIGZpbGw9InVybCgjYikiLz48cGF0aCBkPSJNMjIuMzkgMjUuNjhsLTMuNzItNy4zMi0uMjEtLjM2QTUuNzcgNS43NyAwIDAgMCAxNiAxNS42YTYgNiAwIDAgMSAxLjA5LS40MSA1Ljc2IDUuNzYgMCAwIDEgMS40Mi0uMTloNy44MWE1Ljc4IDUuNzggMCAwIDEgNSAyLjk1bC4yMS40MSAxMC4wOCAyMCAzLjcyIDcuMzIuMi40MUE1Ljg4IDUuODggMCAwIDAgNDggNDguNGE1Ljc0IDUuNzQgMCAwIDEtMi41NC42aC03LjhhNS43OCA1Ljc4IDAgMCAxLTUtMi45NGwtLjItLjQxeiIgZmlsbD0iI2ZmOGM0NCIvPjwvc3ZnPg==",
    link: "https://namecheap.pxf.io/c/2194403/624293/5618"
  }
];

function TrendingOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/trending`) // Replace with your API endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setOffers(Array.isArray(data) ? data : defaultOffers);
        setLoading(false);
      })
      .catch(() => {
        setOffers(defaultOffers);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="trending-offers">
      <h3 className="trending-title">🔥 Top Trending Offers</h3>
      <ul className="trending-list">
        {offers.map((offer) => (
          <li key={offer._id} className="trending-item">
            <a
              href={offer.link}
              className="trending-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={offer.image}
                alt={offer.name}
                className="trending-img"
                loading="lazy"
              />
              <span>{offer.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrendingOffers;