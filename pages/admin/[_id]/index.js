import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import Link from 'next/link'
import { Icon, Table, Button , Container } from "semantic-ui-react";
import Swal from "sweetalert2";
import Chart from 'chart.js/auto';
import MetricAsistencia from '../../../components/MetricAsistencia'
import MetricDate from '../../../components/MetricDate'
import MetricDateHour from '../../../components/MetricDateHour'

const SucursalHome = ({size}) => {
  const router = useRouter();
  const [turno, setTurno] = useState([])
  const [currentMetric, setCurrentMetric] = useState('')
  const { _id } = router.query;

  useEffect(async () => {
    
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
      
      const success = await res.json();
      
      if (success.success) {
        setTurno(success.data.history);

      } else return "Algo salió mal";
    } catch (err) {}
  }, [router]);

  return (
    <>
    <div className="ui container">
      <h2 style={{textAlign: 'center', marginTop: '15%', marginBottom: '3%'}}>Menú operador</h2>
    {size.width / size.height > 0.7 ? (
      <>
      <Button.Group style={{ marginBottom: "10%"}}>
        <Link href={`/admin/${_id}/state`}><Button size="huge" color="black">Reservas</Button></Link>
        <Button size='huge' color='blue' onClick={() => {setCurrentMetric('a')}}>Porcentaje de asistencia</Button>
        <Button size='huge' color='blue' onClick={() => {setCurrentMetric('b')}}>Tendencia de reservas por día</Button>
        <Button size='huge' color='blue' onClick={() => {setCurrentMetric('c')}}>Tendencia de reservas por hora</Button>
      </Button.Group>
      </>
  ) : (
    <div className="ui container" style={{textAlign: "center"}}>
    <Link href={`/admin/${_id}/state`}><Button size="huge" color="black" style={{marginBottom: "2%", width: "80%"}}>Reservas</Button></Link>
    <Button size='huge' color='blue' style={{width: "80%"}} onClick={() => {setCurrentMetric('a')}}>Porcentaje de asistencia</Button>
    <Button size='huge' color='blue' style={{width: "80%", marginTop: "2%", marginBottom: "2%"}} onClick={() => {setCurrentMetric('b')}}>Tendencia de reservas por día</Button>
    <Button size='huge' color='blue' style={{width: "80%"}} onClick={() => {setCurrentMetric('c')}}>Tendencia de reservas por hora</Button>
    </div>
  )}
    </div>
    <div className="ui container fluid" style={size.width / size.height > 0.7 ? {paddingBottom: "10%"} : {marginTop: "10%", paddingBottom: "10%"}}>
      {currentMetric === 'a' ? (< MetricAsistencia turnos={turno} size={size}/>)
      : currentMetric === 'b' ? (<MetricDate turnos={turno} size={size}/>)
      : currentMetric === 'c' ? (<MetricDateHour turnos={turno} size={size}/>) : null}

      <div className="ui container" style={{marginTop: "3%"}}>
     <Button animated onClick={()=>router.back()} >
      <Button.Content visible>Atrás</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
    </div>
    </div>
    </>
  )
}

export default SucursalHome