function OptionsRow({ label, options, active, onSelect }) {
  return (
    <div className="setting-row">
      <span>{label}</span>
      <div className="difficulty-options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`difficulty-btn ${active === opt ? "active" : ""}`}
            onClick={() => onSelect(opt)}
          >
            {typeof opt === "string" ? opt.toUpperCase() : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OptionsRow;
