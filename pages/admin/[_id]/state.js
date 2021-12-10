import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Table, Button , Container } from "semantic-ui-react";
import Swal from "sweetalert2";

const state = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([]);
  const [idSucursal, setIdSucursal] = useState("");
  const [newTable, setNewTable] = useState([]);

  useEffect(async () => {
    const { _id } = router.query;
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const success = await res.json();

      if (success.success) {
        setTurno(success.data.history);
        setIdSucursal(success.data._id);
      } else return "salio mal";
    } catch (err) {}
  }, [router]);

  const handleClick = async (e, value, id) => {
    e.preventDefault();
    try {
      const swal = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estos cambios no se podran revertir!",
        icon: "¡Atención!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cambiar estado!",
        cancelButtonText: "Cancelar"
      });
      if(swal.isConfirmed){
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
        Swal.fire("Estado cambiado!", "Asistencia modificada", "success");
        
      } else {
        return Notification.errorMessage("Ha ocurrido un error");
      } 
      
      setNewTable(success);
  
    }
    } catch (e) {
      return Notification.errorMessage("Ha ocurrido un error");
    }
  };

  return (
    <div>
      <Container>
      <Table style={{ height: "50%", width: "70%", margin: "auto" }} celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Dia</Table.HeaderCell>
            <Table.HeaderCell>DNI</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "20%" }}>
              Asistencia
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {newTable.success
            ? newTable.data.history.map((data, i) => {
                return (
                  <Table.Row>
                    {console.log(newTable)}
                    <Table.Cell> {data.client.name}</Table.Cell>
                    <Table.Cell> {data.date}</Table.Cell>
                    <Table.Cell> {data.client.dni}</Table.Cell>
                    <Table.Cell> {data.state}</Table.Cell>

                    {data.state === "pendiente" ? (
                      <div>
                        <Table.Cell>
                          <Button
                            onClick={handleClick}
                            positive
                            value={data._id}
                          >
                            Asistio
                          </Button>
                          <Button
                            onClick={handleClick}
                            negative
                            value={data._id}
                          >
                            No asistio
                          </Button>
                        </Table.Cell>
                      </div>
                    ) : (
                      <Table.Cell>
                        <p>Confirmada</p>
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })
            : turno.map((data, i) => {
                return (
                  <Table.Row>
                    {console.log(data)}
                    <Table.Cell> {data.client.name}</Table.Cell>
                    <Table.Cell> {data.date}</Table.Cell>
                    <Table.Cell> {data.client.dni}</Table.Cell>
                    <Table.Cell> {data.state}</Table.Cell>

                    {data.state === "pendiente" ? (
                      <Table.Cell>
                        <Button onClick={handleClick} positive value={data._id}>
                          Asistio
                        </Button>
                        <Button onClick={handleClick} negative value={data._id}>
                          No asistio
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
      <Button animated onClick={()=>router.back()} >
      <Button.Content visible>Volver atras</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
    </Container>
    </div>
  );
};

export default state;
