import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { Icon, Table, Button , Container } from "semantic-ui-react";
import Swal from "sweetalert2";
import Chart from 'chart.js/auto';
import MetricAsistencia from '../../../components/MetricAsistencia'
import MetricDate from '../../../components/MetricDate'

const SucursalHome = ({size}) => {
  const router = useRouter();
  const [turno, setTurno] = useState([])

  useEffect(async () => {
    const { _id } = router.query;
    
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
    <div>
      <h1>porcentaje de asistencia:</h1>
      < MetricAsistencia turnos={turno} size={size}/>
      <div>
      {<MetricDate turnos={turno} size={size}/>}
    </div>
    </div>
  )
}

export default SucursalHome