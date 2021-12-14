import React, { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { Form } from "semantic-ui-react";
import { motion } from "framer-motion";
import { Bar } from 'react-chartjs-2';
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const MetricDate = ({size, turnos}) => {

  const [filterTurno, setFilterTurno] = useState([])
  const [sortTurno, setSortTurno] = useState([])
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  console.log(sortTurno)

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

  const Domingo = sortTurno.filter(turno => (new Date(turno.date).getDay() === 0)).length
  const Lunes = sortTurno.filter(turno => (new Date(turno.date).getDay() === 1)).length
  const Martes = sortTurno.filter(turno => (new Date(turno.date).getDay() === 2)).length
  const Miercoles = sortTurno.filter(turno => (new Date(turno.date).getDay() === 3)).length
  const Jueves = sortTurno.filter(turno => (new Date(turno.date).getDay() === 4)).length
  const Viernes = sortTurno.filter(turno => (new Date(turno.date).getDay() === 5)).length
  const Sabado = sortTurno.filter(turno => (new Date(turno.date).getDay() === 6)).length

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

  const data = {
    labels: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    datasets: [{
      label: 'Turnos pedidos',
      data: [Domingo, Lunes, Martes, Miercoles, Jueves, Viernes, Sabado],
      backgroundColor: [
        'rgb(55, 199, 132)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div>
      <div>
      <Form>
        <Form.Input size="big">
          <SemanticDatepicker
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
            locale={"es-ES"}
            format={"DD-MM-YYYY"}
            onChange={handleSelectionHasta}
          />
        </Form.Input>
      </Form>
      </div>
      <div>
      < Bar data={data}/>
      </div>
    </div>
  )
}

export default MetricDate