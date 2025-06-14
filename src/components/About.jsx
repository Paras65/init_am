import "./About.css";

function About() {
  return (
    <section className="about-section">
      <img src="/logo-png.png" alt="Init Free Offers Hub Logo" className="about-logo" />
      <h3 className="about-title">About Init Free Offers Hub</h3>
      <p className="about-desc">
        Init Free Offers Hub is your one-stop destination for discovering the latest and greatest deals across fashion, electronics, travel, health, finance, and more. Our mission is to help you save time and money by curating top offers from trusted partners, all in one easy-to-use platform.
      </p>
      <p className="about-desc">
        Browse trending offers, watch product videos, and find answers to your questions in our FAQ. We update our offers regularly to ensure you never miss out on the best deals!
      </p>
      <p className="about-tagline"><em>Empowering you to save more, every day!</em></p>
      <a href="#offers" className="about-cta">Start Browsing Offers</a>
    </section>
  );
}

export default About;

