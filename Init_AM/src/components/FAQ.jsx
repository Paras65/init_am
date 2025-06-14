import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I search for offers?",
    answer: "Use the search bar at the top to find offers by keyword. You can also filter by category."
  },
  {
    question: "Are the offers updated regularly?",
    answer: "Yes, we update our offers frequently to ensure you get the latest deals."
  },
  {
    question: "How do I redeem an offer?",
    answer: "Click on the offer to view more details and follow the instructions to redeem it on the partner site."
  },
  {
    question: "Is this service free?",
    answer: "Yes, browsing and using the offers on our platform is completely free."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <h3 className="faq-title">Frequently Asked Questions</h3>
      <ul className="faq-list">
        {faqData.map((item, idx) => (
          <li key={idx} className="faq-item">
            <button
              className="faq-question"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-answer-${idx}`}
            >
              {item.question}
              <span className="faq-toggle">{openIndex === idx ? "−" : "+"}</span>
            </button>
            <div
              id={`faq-answer-${idx}`}
              className={`faq-answer${openIndex === idx ? " open" : ""}`}
              hidden={openIndex !== idx}
            >
              {item.answer}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FAQ;