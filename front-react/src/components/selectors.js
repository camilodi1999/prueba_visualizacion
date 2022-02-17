import { useState } from "react";

function Selectors(props) {
  const zonas = props.fields["zona"];
  const modos = props.fields["modos"];
  const [selected, setSelected] = useState({ zona: zonas[0], modo: modos[0] });

  const handleChange = (e) => {
    if (e.target.name === "zona") {
      props.handleChange({ ...selected, [e.target.name]: e.target.value });
      setSelected({ ...selected, [e.target.name]: e.target.value });
    } else {
      props.handleChange({ ...selected, [e.target.name]: e.target.value });
      setSelected({ ...selected, modo: e.target.value });
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <div className="row">
        <div className="col-1">
          <h6>Zona Origen</h6>
        </div>
        <div className="col-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="zona"
            onChange={handleChange}
          >
            {zonas.map((z) => {
              return (
                <option value={z} key={z}>
                  {z}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-1">
          <h6>Modo de Transporte</h6>
        </div>
        <div className="col-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="modo"
            onChange={handleChange}
          >
            {modos.map((z) => {
              return (
                <option value={z} key={z}>
                  {z}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default Selectors;
