export default function ProgressBar({ value, label = "Progresso" }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-block">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="progress-fill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
