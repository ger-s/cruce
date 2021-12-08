import React, { useState } from "react";
import { Container, Form, Button, Card, Image } from "semantic-ui-react";
import Link from "next/link";



function UserFound({ user }) {

  const [state, setState] = useState("data")
  const change = async (e)=>{
    setState('edit')
  }


  return (
    // <Container>
      <Container>
        <Card
          style={{
            margin: "20% auto",
            width: "100%"
          }}
          margin="20%"
        >
          <Card.Content>
            {/* <Image
                  floated="right"
                  size="mini"
                  src="/images/avatar/large/steve.jpg"
                /> */}
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>{user.lastName}</Card.Meta>
            <Card.Description>Email: {user.email}</Card.Description>
            <Card.Description>Telefono: {user.phone}</Card.Description>
            <Card.Description>
              Rol: <strong>{user.role}</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
               {/* <Link href={`/admin/edit/user/${user.data.dni}`}> */}
                <Button basic color="green" onClick={change}>
                  Editar
                </Button>
              {/* </Link>  */}

              <Button basic color="red">
                Eliminar
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Container>
    // </Container>
  );
}

export default UserFound;


