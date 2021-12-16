import React, { useEffect, useState } from "react";
import { Dropdown, Form, Button } from "semantic-ui-react";
import { motion } from "framer-motion";


const TurnoHourSelector = ({size, hourSelection, step, daySelection, sucursalSelection}) => {

  const [hourSelector, setHourSelector] = useState([])
  const handleSelection = (e) => {
    e.preventDefault();
    const str = e.target.textContent;
    const strVerify = str.indexOf('¡') > -1 ? str.slice(0, str.indexOf('¡') - 1) : str
    if (strVerify.length < 6) {
      hourSelection(strVerify)
      return step('checkout')
    }
  };

  useEffect(async () => {
    try {
      const res = await fetch(`/api/sucursal/turnos/getAllTurnos/${sucursalSelection}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          day: daySelection,
          dayAfter: `${daySelection.slice(0, 7)}-${Number(daySelection.slice(8)) + 1}`
        })
      });
      const success = await res.json();
      if (success.success) {
        return success.data[0].map((horario, index) => {
          if ((horario.turnosRestantes > 0) && ((new Date(horario.horaTurno).getTime()) >= (new Date().getTime()))) {
            setHourSelector((old) => [
              ...old,
              { 
                key: index, 
                text: 
                (
                  horario.turnosRestantes > 3 ?
                  new Date(horario.horaTurno).toLocaleTimeString('es-AR').slice(0,5)
                  : `${new Date(horario.horaTurno).toLocaleTimeString('es-AR').slice(0,5)} ¡Sólo quedan ${horario.turnosRestantes} turnos!`
                ), 
                value: index 
              },
            ])
          }
        }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, [daySelection]);

  return (
    <motion.div
          className="ui container fluid"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ stiffness: 150 }}
        >
      <div
        className="ui container"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "15%",
          marginBottom: "24%",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "20%" }}>Elegí un horario:</h1>
          <Form>
            <Form.Input size="huge">
              <Dropdown
                placeholder="Horario..."
                selection
                options={hourSelector}
                onChange={handleSelection}
                //style={{ height: "70px" }}
              />
            </Form.Input>
          </Form>
          <Button size="small" color="blue" style={{marginTop: '40%'}} onClick={() => step('sucursal')}>Volver al paso anterior</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default TurnoHourSelector