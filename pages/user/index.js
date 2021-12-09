import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useImput from "../../hooks/useInput";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Card,
  Button,
  Container,
  Form
} from "semantic-ui-react";
import useInput from "../../hooks/useInput";
import Notification from "../../utils/Notification";

const HomeUser = ({ parse }) => {
  const name = useInput("name");
  const lastName = useInput("lastName");
  const email = useInput("email");
  const dni = useInput("DNI");
  const phone = useInput("phone");
  const [user, setUser] = useState({});
  const [state, setState] = useState(true);
  //   const [visible, setVisible] = React.useState(false);
  //   console.log("parse", parse);
  //   console.log("user", user);

  const change = async (e) => {
    setState(!state);
  };
  useEffect(async () => {
    try {
      const res = await fetch(`/api/user/me/${parse.id}`, {
        method: "GET",
        headers: {
          "content-Type": "aplication/json"
        }
      });
      const success = await res.json();
      if (success.success) {
        setUser(success.data);
      }
    } catch (e) {}
  }, [parse, state]);

  const update = async (e) => {
    try {
      const res = await fetch(`/api/user/edit/${parse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.value ? name.value : user.name,
          lastName: lastName.value ? lastName.value : user.name,
          email: email.value ? email.value : user.email,
          dni: dni.value ? dni.value : user.dni,
          phone: phone.value ? phone.value : user.phone
        })
      });
      const success = await res.json();
      if (success.success) {
        Notification.successMessage(success.successMessage);
        change()
      }
      console.log("soy el user modificado", success.data);
    } catch (e) {}
  };

  return (
    // <div className="ui container fluid">
    // //   {/* <Grid columns={1}>
    // <Grid.Column>
    //   <Checkbox
    //     checked={visible}
    //     label={{ children: <code>visible</code> }}
    //     onChange={(e, data) => setVisible(data.checked)}
    //   />
    // </Grid.Column>

    // <Grid.Column>
    //   <Sidebar.Pushable as={Segment}>
    //     <Sidebar
    //       as={Menu}
    //       animation="overlay"
    //       icon="labeled"
    //       inverted
    //       onHide={() => setVisible(false)}
    //       vertical
    //       visible={visible}
    //       width="thin"
    //     >
    //       <Menu.Item as="a">
    //         <Icon name="home" />
    //         Home
    //       </Menu.Item>
    //       <Menu.Item as="a">
    //         <Icon name="gamepad" />
    //         Games
    //       </Menu.Item>
    //       <Menu.Item as="a">
    //         <Icon name="camera" />
    //         Channels
    //       </Menu.Item>
    //     </Sidebar>

    //     <Sidebar.Pusher>
    //       <Segment basic>
    //         <Header as="h3">hola</Header> */}

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
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>{user.lastName}</Card.Meta>
              <Card.Description>Email: {user.email} </Card.Description>
              <Card.Description>DNI: {user.dni}</Card.Description>
              <Card.Description>Telefono: {user.phone}</Card.Description>
              {/* <Card.Description>
                 Rol: <strong></strong>
               </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={change}>
                  Editar mis datos
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Container>
      ) : (
        <Form>
          <Container>
            <Card
              style={{
                margin: "20% auto",
                width: "100%"
              }}
              margin="20%"
            >
              <Card.Content>
                <Card.Description>
                  <Form.Field>
                    Nombre:
                    <input placeholder={user.name} {...name} />
                  </Form.Field>
                </Card.Description>
                <Card.Description>
                  <Form.Field>
                    Apellido:
                    <input placeholder={user.lastName} {...lastName} />
                  </Form.Field>
                </Card.Description>
                <Card.Description>
                  Email:
                  <input placeholder={user.email} {...email} />
                </Card.Description>
                <Card.Description>
                  DNI:
                  <input placeholder={user.dni} {...dni} />
                </Card.Description>
                <Card.Description>
                  Telefono:
                  <input placeholder={user.phone} {...phone} />
                </Card.Description>
                {/* <Card.Description>
            Rol: <strong></strong>
          </Card.Description> */}
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green" onClick={update}>
                    Confirmar cambios
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Container>
        </Form>
      )}
    </Container>

    //           * </Segment>
    //         </Sidebar.Pusher>
    //       </Sidebar.Pushable>
    //     </Grid.Column>
    //   </Grid>
    // </div>
  );
};

export default HomeUser;
