import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { Form } from "semantic-ui-react";
import { motion } from "framer-motion";
import { Doughnut } from 'react-chartjs-2';
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const MetricAsistencia = ({size, turnos}) => {
  const yesterday = new Date(new Date().toLocaleDateString('en-US'))
  const [filterTurno, setFilterTurno] = useState([])
  const [sortTurno, setSortTurno] = useState([])
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  const handleSelectionDesde = (e) => {
    e.preventDefault();
    const str = e.target.dataset.testid.slice(
      e.target.dataset.testid.indexOf("2")
    );
    setDesde(str)
  };

  const handleSelectionHasta = (e) => {
    e.preventDefault();
    const str = e.target.dataset.testid.slice(
      e.target.dataset.testid.indexOf("2")
    );
    setHasta(`${str}T23:59:00`)
  };

  const asistio = (sortTurno.filter(turno => turno.state === "Asistió")).length
  const pendiente = ((sortTurno.filter(turno => turno.state === "pendiente"))).length
  const noAsistio = (sortTurno.filter(turno => turno.state === "No asistió")).length
  const cancelados = (sortTurno.filter(turno => turno.state === "cancelado")).length

  const data = {
    labels: [
      'Asistieron',
      'Pendientes',
      'No asistieron'
    ],
    datasets: [{
      label: 'Asistencia',
      data: [asistio, pendiente, noAsistio],
      backgroundColor: [
        'rgb(55, 199, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 0, 0)',
      ],
      hoverOffset: 4
    }]
  };

  useEffect(() => {
    if (turnos.length > 0) {
      const filter = turnos.filter((turno) => (new Date(desde).getTime() <= (new Date(turno.date).getTime())) && ((new Date(turno.date).getTime()) <= new Date(hasta).getTime()))
      setFilterTurno(filter)

      const sort = filter.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      setSortTurno(sort)
    }
  }, [turnos, desde, hasta])

  return (
    <div className="ui container" style={{marginBottom: "10%"}}>
      <h2>Porcentaje de asistencia:</h2>
      <h4>Desde:</h4>
      <Form>
        <Form.Input size="big">
          <SemanticDatepicker
            maxDate={yesterday}
            minDate={new Date(yesterday.getTime() - (604800000 * 52))}
            locale={"es-ES"}
            format={"DD-MM-YYYY"}
            onChange={handleSelectionDesde}
            key="desde"
          />
        </Form.Input>
      </Form>
      <h4>Hasta:</h4>
      <Form>
        <Form.Input size="big">
          <SemanticDatepicker
            maxDate={yesterday}
            minDate={new Date(yesterday.getTime() - (604800000 * 52))}
            locale={"es-ES"}
            format={"DD-MM-YYYY"}
            onChange={handleSelectionHasta}
          />
        </Form.Input>
      </Form>
      <div className="ui container">
      <Doughnut data={data} style={size.width / size.height > 0.7 ? {marginLeft: "25%", marginRight: '25%'} : {marginBottom: '5%'}}/>
      <h4 style={{color: 'rgb(55, 199, 132)', margin: 0}}>
      {`Asistió el ${(((asistio * 100) / (asistio + pendiente + noAsistio))).toFixed(2)}% de los turnos.`}
      </h4>
      <h4 style={{color: 'rgb(255, 0, 0)', margin: 0}}>
      {`No asistieron el ${(((noAsistio * 100) / (asistio + pendiente + noAsistio))).toFixed(2)}% de los turnos.`}
      </h4>
      <h4 style={{color: 'rgb(54, 162, 235)', margin: 0}}>
      {`Están pendientes el ${(((pendiente * 100) / (asistio + pendiente + noAsistio))).toFixed(2)}% de los turnos.`}
      </h4>
      <h4 style={{margin: 0}}>
      {`Se cancelaron ${cancelados} turnos.`}
      </h4>
    </div>
    </div>
  );
};

export default MetricAsistencia;
