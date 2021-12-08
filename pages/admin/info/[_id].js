import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Image , Header} from "semantic-ui-react";
import Link from "next/link";

function _id() {
  
  const router = useRouter();
  const query = router.query;
  const [sucursal, setSucursal] = useState({})
  console.log("query",query)


  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${query._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        param: JSON.stringify({
          _id: query._id
        })
      });

      const success = await res.json();
      if (success.success) {
        setSucursal(success.data);
      } else {
        return Notification.errorMessage("Ha ocurrido un error");
      }
    } catch (e) {
      // return Notification.errorMessage("Ha ocurrido un error");
    }
  }, [query._id]);
console.log("sucursallll", sucursal)

  return (
    <div>
      <Container >
      <Header size='huge'>Datos de la sucursal</Header>
     <Card.Content  >
              {/* <Image
                floated="right"
                size="mini"
                src="/images/avatar/large/steve.jpg"
              /> */ }
              <Card.Header>{}</Card.Header>
              <Card.Meta>{  }</Card.Meta>
              <Card.Description>Nombre: {sucursal.name}</Card.Description>
              <Card.Description>Dirección: {sucursal.phone}</Card.Description>
              <Card.Description>Telefono: {sucursal.phone}</Card.Description>
              <Card.Description>Horario de Apertura: {sucursal.openingTime}</Card.Description>
              <Card.Description>Horario de Cierre: {sucursal.closingTime}</Card.Description>
              
            </Card.Content>
            <Card.Content extra>  
              <div className="ui three buttons">
              <Link href={`/admin/${sucursal._id}/state`}>
              <Button basic color="green" >
                  Ingresar
                </Button>
              </Link>
<Link href={`/admin/edit/sucursal/${sucursal._id}`}>

                <Button basic color="blue" >
                  Editar
                </Button>
</Link>

                <Button basic color="red">
                  Eliminar
                </Button>
              </div>
            </Card.Content>
              </Container>
    </div>
  );
}

export default _id ;
