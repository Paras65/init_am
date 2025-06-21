import "./Contact.css";

function Contact() {
  return (
    <section className="contact-section">
      <h2>Contact Us</h2>
      <p>
        {/* Have questions, feedback, or partnership inquiries? Fill out the form below or email us at <a href="mailto:support@initfreeoffers.com">support@initfreeoffers.com</a>. */}
      </p>
      <form className="contact-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Your Name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" placeholder="How can we help you?" required />
        </label>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;