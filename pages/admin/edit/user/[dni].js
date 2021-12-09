import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import Notification from "../../../../utils/Notification";


const UserDni = () => {
  const router = useRouter();
  const query = router.query;
  const [user, setUser] = useState({});
 
  const [state, setState] = useState(true);
  const [rol, setRol] = useState({});
 
  const { value } = rol;

  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneUser/${query.dni}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const success = await res.json();
      if (success.success) {
        setUser(success.data);
        setRol({ value: success.data.role });
      }
    } catch (e) {
      //  return Notification.errorMessage("Ha ocurrido un error");
    }
  }, [query.dni, state]);


  const change = async (e) => {
    setState(!state);
  };

  const handleChange = async (e, { value }) => setRol({ value });

  const update = async (e) => {
    try {
      const res = await fetch(`/api/admin/edit/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: rol.value
        })
      });
      const success = await res.json();
      if (success.success) {

        Notification.successMessage(success.successMessage);
        change();
      }
    } catch (e) {
      Notification.errorMessage("Ha ocurrido un error");
    }
  };

  const deleteUser = async (e) => {
    try {
      const res = await fetch(`/api/admin/delete/user/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const success = await res.json();
      if (success.success) {
        Notification.successMessage(success.successMessage);
        return router.push("/admin/search/user");
      }
    } catch (e) {}
  };

  return (
    <Container>
      {state ? (
        <Container>
          <Card
            style={{
              margin: "20% auto",
              width: "100%",
            }}
            margin="20%"
          >
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>{user.lastName}</Card.Meta>
              <Card.Description>Email: {user.email}</Card.Description>
              <Card.Description>DNI: {user.dni} </Card.Description>
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

                <Button basic color="red" onClick={deleteUser}>
                  Eliminar
                </Button>
              </div>
            </Card.Content>
          </Card>

          <button
            style={{ margin: "0 auto" }}
            className={`ui animated submit button`}
            // tabIndex="0"
            onClick={() => router.back()}
          >
            <div className="visible content"> Atras </div>
            <div className="hidden content">
              <i className="left arrow icon"></i>
            </div>
          </button>
        </Container>
      ) : (
        <Container>
          <Card
            style={{
              margin: "20% auto",
              width: "100%",
            }}
            margin="20%"
          >
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>{user.lastName}</Card.Meta>
              <Card.Description>Email: {user.email} </Card.Description>
              <Card.Description>DNI: {user.dni} </Card.Description>
              <Card.Description>Telefono: {user.phone}</Card.Description>

              <Form>
                <Card.Description>
                  <Form.Group inline>
                    <label>Rol</label>
                    <Form.Radio
                      label="Operador"
                      value="operator"
                      checked={value === "operator"}
                      onChange={handleChange}
                    />
                    <Form.Radio
                      label="Usuario"
                      value="user"
                      checked={value === "user"}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Card.Description>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green"
                    onClick={update}
                    >

                      Confirmar cambios
                    </Button>

                    <Button basic color="red" onClick={change}>
                      Cancelar
                    </Button>
                  </div>
                </Card.Content>
              </Form>
            </Card.Content>
          </Card>
        </Container>
      )}
    </Container>
  );
};

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

export default UserDni;
