import { useState } from "react";
import "./ReferAndEarn.css";

function ReferAndEarn() {
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/?ref=yourcode`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="refer-section">
      <h3 className="refer-title">Refer &amp; Earn</h3>
      <p className="refer-desc">
        Invite your friends to Init Free Offers Hub and earn rewards when they join and use our platform!
      </p>
      <div className="refer-link-box">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="refer-link-input"
          aria-label="Referral link"
        />
        <button className="refer-copy-btn" onClick={handleCopy} aria-live="polite">
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <div className="refer-social">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="refer-social-btn"
        >
          Share on Twitter
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(referralLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="refer-social-btn"
        >
          Share on WhatsApp
        </a>
      </div>
      <p className="refer-note">
        Share your link via social media, email, or anywhere you like!
      </p>
    </section>
  );
}

export default ReferAndEarn;