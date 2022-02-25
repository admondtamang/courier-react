import React from "react";

export default function CustomSelect({
  name,
  label,
  options,
  one,
  handleChange,
}) {
  return (
    <div className="pb-2">
      <label>{label}</label>
      <select
        className="inputbox"
        value={one[name] || ""}
        onChange={handleChange(name)}
        inputprops={{
          name: name,
          id: "bookingMode-title",
        }}
      >
        <option value="" disabled>
          None
        </option>
        {options.map((opt, key) => (
          <option key={key} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
