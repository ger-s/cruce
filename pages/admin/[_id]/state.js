import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Table, Button , Container } from "semantic-ui-react";
import Swal from "sweetalert2";

const State = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([]);
  const [idSucursal, setIdSucursal] = useState("");
  const yesterday = new Date(new Date().toLocaleDateString('en-US'))
  const [filterTurno, setFilterTurno] = useState([])
  const [sortTurno, setSortTurno] = useState([])

  useEffect(() => {
    if (turno.length > 0) {
      const filter = turno.filter((turno) => (yesterday.getTime() <= (new Date(turno.date).getTime())) && ((new Date(turno.date).getTime()) <= yesterday.getTime() + 604800000))
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
        setIdSucursal(success.data._id);
      } else return "Algo salió mal";
    } catch (err) {}
  }, [router]);



  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const swal = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estos cambios no se podrán revertir!",
        icon: "¡Atención!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, cambiar estado!",
        cancelButtonText: "Cancelar"
      });
      if(swal.isConfirmed){
        const userUpdate = await fetch(`/api/user/me/${e.target.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const res = await fetch(`/api/sucursal/turnos/editStatus/${idSucursal}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: e.target.value,
            state: e.target.textContent,
          }),
        });
        const success =  await res.json();
        if (success) {
          Swal.fire("¡Estado modificado!", "Asistencia modificada", "success");
          setTimeout(() => {router.reload()}, 2000);
        } else {
          return Notification.errorMessage("Ha ocurrido un error");
        } 
  
    }
    } catch (e) {
      return Notification.errorMessage("Ha ocurrido un error");
    }
  };

  return (
    <div>
      <Container>
        <h2 style={{textAlign:"center", margin: "3%"}}>Reservas</h2>
      <Table style={{ height: "50%", width: "70%", margin: "auto" }} celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Día</Table.HeaderCell>
            <Table.HeaderCell>DNI</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "20%" }}>
              Asistencia
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortTurno.map((data, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell> {data.client.name}</Table.Cell>
                    <Table.Cell> {new Date(data.date).toLocaleString("es-AR")}</Table.Cell>
                    <Table.Cell> {data.client.dni}</Table.Cell>
                    <Table.Cell> {data.state}</Table.Cell>

                    {data.state === "pendiente" && (new Date(data.date).getTime()) <= (new Date().getTime()) ? (
                      <Table.Cell>
                        <Button onClick={handleClick} positive value={data._id} id={data.client.dni}>
                          Asistió
                        </Button>
                        <Button onClick={handleClick} negative value={data._id} id={data.client.dni}>
                          No asistió
                        </Button>
                      </Table.Cell>
                    ) : data.state === "pendiente" ? (
                      <Table.Cell>
                        <Button onClick={handleClick} positive value={data._id} id={data.client.dni} disabled>
                          Asistió
                        </Button>
                        <Button onClick={handleClick} negative value={data._id} id={data.client.dni} disabled>
                          No asistió
                        </Button>
                      </Table.Cell>
                    ) : (
                      <Table.Cell>
                        <p>Confirmada</p>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
      <Button animated onClick={()=>router.back()} style={{marginBottom: '5%'}} >
      <Button.Content visible>Atrás</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
    </Container>
    </div>
  );
};

export default State;