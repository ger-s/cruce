import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";

const TurnoSucursalSelector = ({size, sucursalSelection, step }) => {
  const [sucursales, setSucursales] = useState([]);

  const handleSelection = (e) => {
    e.preventDefault();
    sucursalSelection(e.target.textContent);
    return step('day')
  };

  useEffect(async () => {
    try {
      const scs = await fetch("/api/admin/getAllSucursales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const success = await scs.json();
      if (success) {
        return success.data.map((sucursal, index) =>
          setSucursales((old) => [...old, { key: index, text: sucursal.name, value: index }])
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div
        className="ui container"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "20%",
          marginBottom: "24%",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "20%" }}>Elegí una sucursal:</h1>
          <Form>
            <Form.Input size="huge">
              <Dropdown
                placeholder="Sucursal"
                search
                selection
                options={sucursales}
                onChange={handleSelection}
                //style={{ height: "70px" }}
              />
            </Form.Input>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TurnoSucursalSelector;
