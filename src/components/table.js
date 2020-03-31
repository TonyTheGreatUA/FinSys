import React from "react";

import _map from "lodash/map";

function normalizeDateValue(value) {
  return value < 10 ? "0" + value : value;
}

function formatDate(date) {
  const jsDate = new Date(date);

  const day = jsDate.getDate();
  const month = jsDate.getMonth() + 1;
  const year = jsDate.getFullYear();

  return `${normalizeDateValue(day)}.${normalizeDateValue(month)}.${year}`;
}

export function Table({ costs, onDelete }) {
  function onDeleteClick(id) {
    return () => onDelete(id);
  }

  return (
    <div className="section costs-table">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Профит</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {_map(costs, cost => (
            <tr>
              <td>{formatDate(cost.date)}</td>
              <td>{cost.value}</td>
              <td>
                <button className="btn" onClick={onDeleteClick(cost.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
