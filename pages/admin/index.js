import React, { useState, useEffect } from "react";
import Link from "next/link";


import { Header, Icon, Image, Menu, Segment, Sidebar ,Dropdown,Grid, Form, Button} from "semantic-ui-react";
const HomeAdmin = () => {

const [sucursales, setSucursales] = useState([]);



useEffect(async () => {
  try {
    const res = await fetch(`/api/admin/getAllSucursales`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const success = await res.json();
    if (success) {
      success.data.map((sucursales, index) => {
        setSucursales((old) => [
          ...old,
          { key: index, text: sucursales.name, value: index },
        ]);
      });
    }
  } catch (e) {
    return Notification.errorMessage("nada");
  }
}, []);

  const [visible, setVisible] = React.useState(false);

  
  return (
        <div className="ui container fluid">
    <Grid >
    <Grid.Row>
      <Grid.Column width={3}>
      <Sidebar.Pushable
      as={Segment}
      className=" ui container fluid"
      style={{ height: "900px" }}
    >
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        style={{width:"100%" ,}}
      >
        <Menu.Item as="a">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="gamepad" />
          Games
        </Menu.Item>
        <Menu.Item as="a">
          <Icon name="camera" />
          Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment basic>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>


      </Grid.Column>
      <Grid.Column width={13}>
          <h1 style={{textAlign:"center"}}>Elegi una sucursal</h1>
          <Dropdown
              clearable
              fluid
             
              search
              selection
              options={sucursales} 
   // onSubmit={handleSubmit}
              placeholder="Select Country"
            />
            <Form /* onSubmit={handleSubmit} */ >
          <Link href="/admin/info">
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
          >
            Info sucursal
          </Button>
          </Link>
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
          >
            Crear operador
          </Button>
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
          >
            Crear sucursal
          </Button>
        </Form>
            
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
  )
  
};

export default HomeAdmin;
