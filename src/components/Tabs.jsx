import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  const activePanelId = `tab-panel-${activeTab}`;

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Seções do painel">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            id={`tab-${index}`}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <section
          key={tab.label}
          id={`tab-panel-${index}`}
          className="tab-panel"
          role="tabpanel"
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
          tabIndex="0"
        >
          {tab.content}
        </section>
      ))}
    </div>
  );
}
