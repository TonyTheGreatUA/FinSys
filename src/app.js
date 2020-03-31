import "./app.less";

import React, { useState } from "react";

import moment from "moment";

import _values from "lodash/values";

import { Parser } from "json2csv";

import { getCapital, updateCapital } from "./api/capital";
import { getCosts, addCost, deleteCostById } from "./api/cost";
import { getCoefficient, updateCoefficient } from "./api/coefficient";

import { applyChanges } from "./utils/project";
import { download } from "./utils/file";

import { Header } from "./components/header";
import { Table } from "./components/table";
import { Form } from "./components/form";

function App() {
  const [coefficient, setCoefficient] = useState(getCoefficient());
  const [capital, setCapital] = useState(getCapital());
  const [costs, setCosts] = useState(getCosts());

  function onCostAdd(cost) {
    const nextCosts = addCost(cost);

    setCosts(nextCosts);

    const nextCoefficient = applyChanges(capital, nextCosts);
    setCoefficient(nextCoefficient);
    updateCoefficient(nextCoefficient);
  }

  function onCostDelete(id) {
    const nextCosts = deleteCostById(id);
    setCosts(nextCosts);

    const nextCoefficient = applyChanges(capital, nextCosts);
    setCoefficient(nextCoefficient);
    updateCoefficient(nextCoefficient);
  }

  function onCapitalChange(value) {
    const nextCapital = updateCapital(value);

    setCapital(nextCapital);

    const nextCoefficient = applyChanges(nextCapital, costs);
    setCoefficient(nextCoefficient);
    updateCoefficient(nextCoefficient);
  }

  function exportToCsv() {
    const fields = [
      {
        label: "Date",
        value: (row, field) => {
          return row.date
            ? moment(row.date).format("DD.MM.YYYY")
            : field.default;
        },
        default: null
      },
      {
        label: "Profit",
        value: (row, field) => {
          return row.value ? Number(row.value) : field.default;
        },
        default: null
      },
      {
        label: "Coefficient",
        value: "coefficient"
      }
    ];

    const jsonToCsvParser = new Parser({
      fields,
      withBOM: true,
      quote: "",
      delimiter: ";"
    });

    const data = [
      ..._values(costs),
      {
        coefficient: Math.round(coefficient * 1000) / 1000
      }
    ];

    const csvContent = jsonToCsvParser.parse(data);
    const encodedCsvContent = encodeURIComponent(csvContent);

    const encodedUri = "data:text/csv;charset=utf-8," + encodedCsvContent;

    download("average_rate_of_return.csv", encodedUri);
  }

  return (
    <div className="container">
      <div className="section paper">
        <h3>Profit</h3>
        <div className="costs-section">
          <Form onSubmit={onCostAdd} />
          <Table costs={costs} onDelete={onCostDelete} />
        </div>
      </div>
      <Header value={capital} onChange={onCapitalChange} />
      <div className="section paper">
        <h3>Average rate of return</h3>
        <span>{Math.round(coefficient * 1000) / 1000}</span>
      </div>
      <div className="section paper">
        <h3>Actions</h3>
        <button className="btn" onClick={exportToCsv}>
          Export To Csv
        </button>
      </div>
    </div>
  );
}

export default App;
