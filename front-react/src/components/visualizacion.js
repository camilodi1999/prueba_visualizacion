import React, { useState, useEffect } from "react";

function Visualizacion() {
  const url_django = "http://localhost:8000";
  const [fields, setFields] = useState({});
  const [data, setData] = useState({});

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

  console.log(fields);
  console.log(data);
  return (
    <div>
      <p>hola</p>
    </div>
  );
}

export default Visualizacion;
