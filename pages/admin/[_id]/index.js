import React, { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import { Icon, Table, Button , Container } from "semantic-ui-react";
import Swal from "sweetalert2";

const SucursalHome = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([])
  const yesterday = new Date(new Date().toLocaleDateString())
  const [filterTurno, setFilterTurno] = useState([])
  const [sortTurno, setSortTurno] = useState([])
  /* const sortTurno = filterTurno.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  }) */

  console.log(sortTurno)

  useEffect(() => {
    if (turno.length > 0) {
      const filter = turno.filter((turno) => (yesterday.getTime() - (604800000 * 2) <= (new Date(turno.date).getTime())) && ((new Date(turno.date).getTime()) <= new Date().getTime()))
      setFilterTurno(filter)

      const sort = filter.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
      setSortTurno(sort)
    }
  }, [turno])

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
      <h1>largo de turnos en 2 semanas: {sortTurno.length}</h1>
      <h1>asistieron: {(sortTurno.filter(turno => turno.state === "Asistió")).length}</h1>
      <h1>porcentaje de asistencia: {((sortTurno.filter(turno => turno.state === "Asistió")).length / sortTurno.length) * 100}</h1>
    </div>
  )
}

export default SucursalHome