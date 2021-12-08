import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Table, Button } from "semantic-ui-react";

const state = () => {
  const router = useRouter();
  const [turno, setTurno] = useState([]);
  const query = router.query;
  const [state, setState] = useState("");

  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${query._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "aplication/json",
        },
      });

      const success = await res.json();
      console.log(success, "sdsdsd");

      if (success.success) {
        setTurno(success.data.history);
      } else return "salio mal";
    } catch (err) {}
  }, [query.sucursal]);

  


  const handleClick = async (e, value,id) => {
e.preventDefault()
try {
  setState(e.target.value)
  const dni=e.target.id

  const res=await fetch(`/api/admin/getOneUser/${dni}`,  {
  method:"GET",
  headers:  {
   "Content-Type":"aplication/json",
  },
  
  })
  const success = await res.json();
  console.log(success)
const idUser=success.id

  if (success.success) {
try{

const res =await fetch(`api/sucursal/turnos/editstatus/${idUser}`,  {
method:"PUT",
headers:  {
"Content-Type":"aplication/json",
},
body:JSON.stringify(  {
status:state
})
})  
const success=await res.json();


}
catch(err)  {
  return err
}
  } else {
    return Notification.errorMessage("Ha ocurrido un error");
  }


} catch (error) {
  return error
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
              <Table.Row  >
                <Table.Cell> {data.client.name}</Table.Cell>
                <Table.Cell> {data.date}</Table.Cell>
                {console.log(data)}
                <Table.Cell> {data.state}</Table.Cell>

                <Table.Cell>
                  <Button onClick={handleClick} positive id={data.client.dni}>
                    Asistio
                  </Button>
                  <Button onClick={handleClick} negative id={data.client.dni}>
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
