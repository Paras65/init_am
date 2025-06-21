import React from "react";

function PrivacyPolicy() {
  return (
    <section className="privacy-policy" style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
      <h2>Privacy Policy</h2>
      <p>
        <strong>Last updated:</strong> {new Date().getFullYear()}
      </p>
      <p>
        This website (“Init Free Offers Hub”) respects your privacy. We do not collect personal information unless you voluntarily provide it, such as through contact forms.
      </p>
      <h3>Information We Collect</h3>
      <ul>
        <li>We may collect non-personal information such as browser type, device, and usage statistics for analytics purposes.</li>
        <li>We do not sell or share your personal information with third parties.</li>
      </ul>
      <h3>Cookies</h3>
      <p>
        We may use cookies to enhance your experience. You can disable cookies in your browser settings.
      </p>
      <h3>Third-Party Links</h3>
      <p>
        Our site may contain links to third-party websites. We are not responsible for their privacy practices.
      </p>
      <h3>Contact</h3>
      <p>
        If you have questions about this Privacy Policy, please contact us via the Contact page.
      </p>
    </section>
  );
}

export default PrivacyPolicy;