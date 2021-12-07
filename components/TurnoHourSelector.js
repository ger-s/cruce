import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";


const TurnoHourSelector = ({size, hourSelection, setHourSelection, step, daySelection, sucursalSelection}) => {

  const handleSelection = (e) => {
    e.preventDefault();
    /* const str = e.target.dataset.testid.slice(
      e.target.dataset.testid.indexOf("2")
    ); */
    console.log(e.target);
  };

  useEffect(async () => {
    try {
      const res = await fetch(`/api/sucursal/turnos/getAllTurnos/${sucursalSelection}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: daySelection,
          dayAfter: `${daySelection.slice(0, 7)}-${Number(daySelection.slice(8)) + 1}`
        })
      });
      const success = await res.json();
      console.log(success)
      if (success.success) {
        return success.data.map((horario, index) =>
        setHourSelection((old) => [
            ...old,
            { key: index, text: new Date(horario.horaTurno).toLocaleTimeString('es-AR').slice(0,5), value: index },
          ])
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [daySelection]);

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
          <h1 style={{ marginBottom: "20%" }}>Elegí un horario:</h1>
          <Form>
            <Form.Input size="huge">
              <Dropdown
                placeholder="Sucursal"
                selection
                options={hourSelection}
                onChange={handleSelection}
                //style={{ height: "70px" }}
              />
            </Form.Input>
          </Form>
        </div>
      </div>
    </>
  );
}

export default TurnoHourSelector