import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import UserFound from "../../../../components/UserFound";

import Link from "next/link";

function userDni() {
  const router = useRouter();
  const query = router.query;
  const [user, setUser] = useState({});
  console.log("user",user._id);

  const [state, setState] = useState(true);
  const [rol, setRol] = useState("");
  console.log("rol",rol);


  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneUser/${query.dni}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        param: JSON.stringify({
          dni: query.id
        })
      });

      const success = await res.json();
      if (success.success) {
        setUser(success.data);
      } else {
        return Notification.errorMessage("Ha ocurrido un error");
      }
    } catch (e) {
      // return Notification.errorMessage("Ha ocurrido un error");
    }
  }, [query.dni]);

  const change = async (e) => {
    setState(!state);
  };

  const handleChange = async (e,  value ) => setRol({ value });

  const update = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/edit/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          role: rol.value.value
        })
      });
      const success = await res.json()
      console.log("success", success);
      // change();
    } catch (e) {
      Notification.errorMessage("Ha ocurrido un error");
    }
  };

  const { value } = rol;
  return (
    <Container>
      {state ? (
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
                <Button basic color="green" onClick={change}>
                  Editar
                </Button>

                <Button basic color="red">
                  Eliminar
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Container>
      ) : (
        <Container>
          <Card
            style={{
              margin: "20% auto",
              width: "100%"
            }}
            margin="20%"
          >
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>{user.lastName}</Card.Meta>
              <Card.Description>Email: {user.email} </Card.Description>
              <Card.Description>DNI: {user.dni} </Card.Description>
              <Card.Description>Telefono: {user.phone}</Card.Description>

              <Form onSubmit={update}>
                <Card.Description>
                  <Form.Group inline>
                    <label>Rol</label>
                    <Form.Radio
                      label="Admin"
                      value="admin"
                      checked={value === "admin"}
                      onChange={handleChange}
                    />
                    <Form.Radio
                      label="Operador"
                      value="operador"
                      checked={value === "operador"}
                      onChange={handleChange}
                    />
                    <Form.Radio
                      label="Usuario"
                      value="usuario"
                      checked={value === "usuario"}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Card.Description>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green" >
                      Confirmar cambios
                    </Button>

                    {/* <Button basic color="red" onClick={change}>
                      Cancelar
                    </Button> */}
                  </div>
                </Card.Content>
              </Form>
            </Card.Content>
          </Card>
        </Container>
      )}
    </Container>
  );
}

// export async function getStaticProps() {
//   const router = useRouter();

//   const query = router.query;
//   const res = await fetch(`/api/admin/getOneUser/${query.dni}`)
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { user }

//   }
// }

export default userDni;
