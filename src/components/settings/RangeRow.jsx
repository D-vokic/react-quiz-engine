function RangeRow({ label, value, min, max, step, disabled, onChange }) {
  return (
    <div className="setting-row">
      <span>
        {label}: {value}s
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default RangeRow;
