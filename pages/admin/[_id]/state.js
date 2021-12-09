import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Table, Button } from "semantic-ui-react";

const state = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([]);
  const [state, setState] = useState("");
  const [idSucursal, setIdSucursal] = useState("");
  const [idTurno, setIdTurno] = useState("");

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
      console.log(success, "sdsdsd");

      if (success.success) {
        setTurno(success.data.history);
        setIdSucursal(success.data._id);
      } else return "salio mal";
    } catch (err) {}
  }, [router]);

  const handleClick = async (e, value, id) => {
    try {
      setIdTurno(e.target.id);
      setState(e.target.textContent);
      console.log(e.target.textContent, "IDDELTURNO");
      console.log(state, "ESTADO");

      const res = await fetch(`/api/sucursal/turnos/editStatus/${idSucursal}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: idTurno,
          state: state,
        }),
      });
      console.log(state,"PLS")
      const success = await res.json();
      console.log(success)
      if(success) {
       console.log("exitoso")
      }else {
        console.log("error")
      }
    } catch (error) {
      return error;
    }
  };

  console.log(turno, "SOY EL TURNO");

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
              <Table.Row>
                <Table.Cell> {data.client.name}</Table.Cell>
                <Table.Cell> {data.date}</Table.Cell>
                {console.log(data)}
                <Table.Cell> {data.state}</Table.Cell>

                <Table.Cell>
                  <Button onClick={handleClick} positive id={data._id}>
                    Asistio
                  </Button>
                  <Button onClick={handleClick} negative id={data._id}>
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

export default state;
