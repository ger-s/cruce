import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import TurnoDaySelector from "../components/TurnoDaySelector";
import TurnoSucursalSelector from "../components/TurnoSucursalSelector";
import TurnoHourSelector from "../components/TurnoHourSelector";
import TurnoCheckout from "../components/TurnoCheckout";

const Turno = ({ size }) => {
  const [sucursalSelection, setSucursalSelection] = useState("");
  const [daySelection, setDaySelection] = useState("");
  const [hourSelection, setHourSelection] = useState("");
  const [currentStep, setCurrentStep] = useState("sucursal");

  /* useEffect( async () => {
    try {
      if (sucursalSelection) {
        const scs = await fetch(`/api/sucursal/turnos/getAllTurnos/${sucursalSelection}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        const success = await scs.json();
        console.log(success)
        if (success.data.length < 1) {
          const scs2 = await fetch(`/api/admin/getOneSucursal/${sucursalSelection}`)
          const sucursal = await scs2.json()

          console.log(sucursal)

          for (let day = 7; day <= 29; day++) {
            for (let hour = Number(sucursal.data.openingTime.slice(0, 2)); hour <= Number(sucursal.data.closingTime.slice(0, 2)); hour++) {
              for (let min = 0; min < 60; min += 15) {
                const seed = await fetch(`/api/sucursal/turnos/seedTurnos/${sucursalSelection}`, 
                { 
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    horaTurno: [day, hour, min],
                    turnosRestantes: 4
                })}
                )
              }
            }
          }
          
        }
      }
    } catch(error) {
      console.log(error)
    }
  }, [sucursalSelection]) */

  return (
    <div
      style={
        size.width / size.height > 0.7
          ? { marginBottom: "35%" }
          : { marginBottom: "110%" }
      }
    >
      {currentStep === "sucursal" ? (
          <TurnoSucursalSelector
            sucursalSelection={setSucursalSelection}
            size={size}
            step={setCurrentStep}
          />
      ) : currentStep === "day" ? (
          <TurnoDaySelector
            daySelection={setDaySelection}
            size={size}
            step={setCurrentStep}
          />
      ) : currentStep === "hour" ? (
          <TurnoHourSelector
            sucursalSelection={sucursalSelection}
            daySelection={daySelection}
            hourSelection={setHourSelection}
            size={size}
            step={setCurrentStep}
          />
      ) : currentStep === "checkout" ? (
          <TurnoCheckout
            sucursalSelection={sucursalSelection}
            daySelection={daySelection}
            hourSelection={hourSelection}
            size={size}
            step={setCurrentStep}
          />
      ) : null}
    </div>
  );
};

export default Turno;
