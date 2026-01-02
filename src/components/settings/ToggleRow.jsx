function ToggleRow({ label, value, onToggle, children }) {
  return (
    <div className="setting-row">
      <span>{label}</span>
      <button className="toggle" onClick={onToggle}>
        {value ? "On" : "Off"}
      </button>
      {children}
    </div>
  );
}

export default ToggleRow;
