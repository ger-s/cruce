import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form } from "semantic-ui-react";
import { motion } from "framer-motion";
import { Bar } from 'react-chartjs-2';
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const MetricDateHour = ({turnos}) => {

  const router = useRouter()
  const { _id } = router.query
  const [sortTurno, setSortTurno] = useState([])
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [horario, setHorario] = useState({desde: 0, hasta: 0})

  /* 
  daySelection debería definirse en un handle en 
  unos botones/dropdown con los días de la semana
  será un int del 0 al 6 
  */
  const [daySelection, setDaySelection] = useState('')

  /* 
  como no podemos saber con exactitud las horas (los rangos horarios pueden cambiar),
  la data para el gráfico la vamos a tener que mapear dentro de dataArray.
  hay varias maneras de conseguir el rango horario:
  1- usar la prop turnos, utilizando solo la hora de cada turno (18:45 = 18)
  si recorremos todo el array, vamos a tener todas las horas en uso de ese día.
  probablemente esta sea la mejor manera de lidiar con cambios de horario en una sucursal
  2- hacer un fetch a la api, traer la sucursal de alguna forma,
  y usar de manera directa sus horarios de apertura y cierre
  probablemente esta sea la forma más eficiente en recursos, 
  sólo necesitamos traerle el id de la sucursal a este componente (router.query)
  */
  const [dataArray, setDataArray] = useState({data: [], labels: []})

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
    
    const data = {
      labels: dataArray.labels,
      datasets: [{
        label: 'Turnos pedidos',
        data: dataArray.data,
        backgroundColor: [
          'rgb(55, 199, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }]
    };

  const Domingo = sortTurno.filter(turno => (new Date(turno.date).getDay() === 0)).length

  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${_id}`)
      const success = await res.json()
      success.success ? setHorario({desde: success.data.openingTime, hasta: closingTime}) : null

    } catch (error) {
      console.log(error)
    }
  }, [])

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
    <div></div>
  )
}

export default MetricDateHour;