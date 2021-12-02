import React from "react";

import { Header, Icon, Image, Menu, Segment, Sidebar ,Dropdown,Grid} from "semantic-ui-react";
const HomeAdmin = () => {
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
              multiple
              search
              selection
             /*  options={SUCURSALES} */
              placeholder="Select Country"
            />
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
  )
  
};

export default HomeAdmin;
