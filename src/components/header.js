import React from "react";

export function Header({ value, onChange }) {
  function onCapitalChange(event) {
    const value = event.target.value;

    onChange(value);
  }

  return (
    <div className="section paper">
      <h2>Инвестиции</h2>
      <input
        type="number"
        value={value}
        onChange={onCapitalChange}
        placeholder="Investments"
      />
    </div>
  );
}
