import React, { useState, useEffect } from "react";
import Chart from "./chart";
import LineChart from "./lineChart";
import Selectors from "./selectors";
import * as d3 from "d3";

function Visualizacion() {
  const url_django = "http://localhost:8000";
  const [fields, setFields] = useState({});
  const [data, setData] = useState({});
  const [svg, setSvg] = useState();

  function handleChange(fields_updated) {
    let url = new URL(url_django + "/data/");
    url.search = new URLSearchParams(fields_updated).toString();

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }
  useEffect(() => {
    fetch(url_django + "/params")
      .then((res) => res.json())
      .then((json) => {
        setFields(json);
      })
      .then(() => fetch(url_django + "/first"))
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      {Object.keys(fields).length !== 0 ? (
        <Selectors fields={fields} handleChange={handleChange} />
      ) : null}
      {Object.keys(data).length !== 0 ? <LineChart data={data} /> : null}
    </div>
  );
}

export default Visualizacion;
