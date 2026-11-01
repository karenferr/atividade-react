import { useEffect, useRef, useState } from "react";

export default function Dropdown({ options, onSelect, label = "Filtrar" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    }
    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="dropdown" ref={menuRef}>
      <button
        className="secondary-button"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        {label} <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="dropdown-menu" role="menu">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              role="menuitem"
              onClick={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
