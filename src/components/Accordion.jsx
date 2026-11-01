import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        return (
          <section className={`accordion-item ${isOpen ? "is-open" : ""}`} key={item.title}>
            <h3>
              <button
                className="accordion-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.title}</span>
                <span className="accordion-symbol" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            <div id={panelId} className="accordion-panel" hidden={!isOpen}>
              <p>{item.content}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
