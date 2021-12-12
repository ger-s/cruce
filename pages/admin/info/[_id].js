import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Icon } from "semantic-ui-react";

import {
  Container,
  Form,
  Button,
  Card,
  Image,
  Header,
} from "semantic-ui-react";
import Link from "next/link";
import Notification from "../../../utils/Notification";

function _id() {
  const router = useRouter();
  const query = router.query;
  const [sucursal, setSucursal] = useState({});
  console.log("query", query);

  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${query._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const success = await res.json();
      if (success.success) {
        setSucursal(success.data);
      } else {
        return Notification.errorMessage("Ha ocurrido un error");
      }
    } catch (e) {
      return Notification.errorMessage(e);
    }
  }, [query._id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const swal = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estos cambios no se podran revertir!",
        icon: "¡Atención!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
        cancelButtonText: "Cancelar"
      });
      console.log("result swal", swal);
      

      if (swal.isConfirmed) {
        const res = await fetch(`/api/admin/delete/sucursal/${query._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
       
        const success = res.json();
        
        if (success) {
          Swal.fire("¡Eliminado!", "Sucursal eliminada.", "success");

          return router.push(`/admin`);
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
        <Container style={{textAlign: 'center' , marginTop: "10%"}}>
        <Header size="huge">Datos de la sucursal</Header>
        <Card.Content>
          {/* <Image
                floated="right"
                size="mini"
                src="/images/avatar/large/steve.jpg"
              /> */}
          <Card.Header>{}</Card.Header>
          <Card.Meta>{}</Card.Meta>
          <Card.Description>Nombre: {sucursal.name}</Card.Description>
          <Card.Description>Dirección: {sucursal.address}</Card.Description>
          <Card.Description>Teléfono: {sucursal.phone}</Card.Description>
          <Card.Description>
            Horario de Apertura: {sucursal.openingTime}
          </Card.Description>
          <Card.Description>
            Horario de Cierre: {sucursal.closingTime}
          </Card.Description>
        </Card.Content>
        </Container>
        <Card.Content style={{marginTop: "10%" , marginBottom: "13%"}} extra>
          <div className="ui three buttons">
            <Link href={`/admin/${sucursal._id}/state`}>
              <Button basic color="green">
                Ingresar
              </Button>
            </Link>
            <Link href={`/admin/edit/sucursal/${sucursal._id}`}>
              <Button basic color="blue">
                Editar
              </Button>
            </Link>

            <Button onClick={handleSubmit} basic color="red">
              Eliminar
            </Button>
          </div>
        </Card.Content>
      </Container>
      <Container>
        
      <Button animated onClick={()=>router.back()} >
      <Button.Content visible>Atrás</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
      </Container>
    </div>
    
  );
}

export default _id;
