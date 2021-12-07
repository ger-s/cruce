import { useEffect, useState } from "react";
import TurnoDaySelector from "../components/TurnoDaySelector";
import TurnoSucursalSelector from "../components/TurnoSucursalSelector";
import TurnoHourSelector from "../components/TurnoHourSelector";

const Turno = ({ size }) => {
  const [sucursalSelection, setSucursalSelection] = useState("");
  const [daySelection, setDaySelection] = useState("");
  const [hourSelection, setHourSelection] = useState("");
  const [currentStep, setCurrentStep] = useState('sucursal');
  
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
    <>
      {currentStep === 'sucursal' ? (
        <TurnoSucursalSelector
          sucursalSelection={setSucursalSelection}
          size={size}
          step={setCurrentStep}
        />
      ) : currentStep === 'day' ? (
        <TurnoDaySelector
          daySelection={setDaySelection}
          size={size}
          step={setCurrentStep}
        />
      ) : currentStep === 'hour' ? (
        <TurnoHourSelector
          sucursalSelection={sucursalSelection}
          daySelection={daySelection}
          hourSelection={hourSelection}
          setHourSelection={setHourSelection}
          size={size}
          step={setCurrentStep}
        />
      ) : currentStep === 'checkout'? (
        <div></div>
      ) : null}
    </>
  );
};

export default Turno;
