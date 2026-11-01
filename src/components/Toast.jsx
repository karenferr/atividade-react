import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">{type === "error" ? "!" : "✓"}</span>
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Fechar notificação">×</button>
    </div>
  );
}
