import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Table, Button } from "semantic-ui-react";

const State = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([]);
  const [idSucursal, setIdSucursal] = useState("");

  useEffect( () => {
    async () => {
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
      } catch (err) {console.log(err)}
    }
  }, [router]);

  const handleClick = async (e, value, id) => {
    try {
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
      const success = await res.json();
      console.log(success);
      if (success) {
        console.log("exitoso");
      } else {
        console.log("error");
      }
    } catch (error) {
      return error;
    }
  };

  
  return (
    <div>
      <Table style={{ height: "50%", width: "70%", margin: "auto" }} celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Dia</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell style={{ width: "20%" }}>
              Asistencia
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {turno.map((data, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell> {data.client.name}</Table.Cell>
                <Table.Cell> {data.date}</Table.Cell>

                <Table.Cell> {data.state}</Table.Cell>

                <Table.Cell>
                  <Button onClick={handleClick} positive value={data._id}>
                    Asistio
                  </Button>
                  <Button onClick={handleClick} negative value={data._id}>
                    No asistio
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default State;
