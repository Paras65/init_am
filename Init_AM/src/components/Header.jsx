import './Header.css';

const categories = [
  "Fashion",
  "Electronics",
  "Travel",
  "Health",
  "Finance"
];

function Header({ onCategorySelect }) {
  return (
    <header className="header">
      <div className="header-top">
        <a href="/" className="header-logo-link" aria-label="Home">
          <img
            src="/logo-png.png"
            alt="Init_AM Logo"
            className="header-logo"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(99,102,241,0.13)",
              background: "#fff",
              objectFit: "contain",
              marginRight: "1rem"
            }}
          />
        </a>
        <h1 className="header-title">Init Free Offers Hub</h1>
      </div>
    </header>
  );
}
export default Header