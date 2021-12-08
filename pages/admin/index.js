import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Header, Icon, Image, Menu, Segment, Sidebar ,Dropdown,Grid, Form, Button} from "semantic-ui-react";
import useInput from "../../hooks/useInput";
import Notification from "../../utils/Notification";

const HomeAdmin = () => {
const noSeUsa = "hola" 
const router = useRouter();
const _id = useInput("ID");

const [id, setId] = useState("")
const [sucursalElegida, setSucursalElegida]= useState([])
const sucursal = useInput("Sucursal");
const [sucursales, setSucursales] = useState([]);
const [sucursalesId, setSucursalesId] = useState([]);

useEffect(async () => {
  if(sucursales.length < 1){

  
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
          { key: sucursales._id , text: sucursales.name, value: index },
          

        ]); /* setSucursalesId((old) => [
          ...old,
          { key: index, text: sucursales._id, value: index },
          
  
        ])  */
      });
    }
  } catch (e) {
    return Notification.errorMessage("nada");
  }
}
}, [noSeUsa]);



  const handleSubmit = async (e) => {


    console.log("acaaaaa elegida", sucursalElegida)
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        param: JSON.stringify({
          _id: id.value
         
        })
      });
      const success = await res.json();
      
     console.log("llegoo",success)

      if (success.success) {
        // localStorage.setItem("dni", JSON.stringify(success.data));
          return router.push(`/admin/info/${success.data._id}`);
        // setUser(success);
      }else{
        return Notification.errorMessage("Ha ocurrido un error");
      }
    } catch (e) {
      return Notification.errorMessage("Ha ocurrido un error");
    }
  };

  const handleClick = (e,value) =>{
    e.preventDefault();
    setSucursalElegida(e.target.textContent)

    value.options.filter(sucursal => {
      if(sucursal.text === e.target.textContent){
        setId(sucursal.key)
      }
    })
    
  }

  


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
          <Form onSubmit={handleSubmit}  >
          <Dropdown
              clearable
              fluid
             
              search
              selection
              options={sucursales}
              onChange={handleClick} 
              
              placeholder="Select Country"
            />
       
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
            >
            Info sucursal
          </Button>
        
            
          <Link href="/admin/search/user">
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
            >
            Crear operador
          </Button>
            </Link>
            <Link href="/admin/crear-sucursal">
          <Button
            primary
            size="huge"
            type="submit"
            style={{ marginBottom: "50%", marginTop: "10%" }}
            >
            Crear sucursal
          </Button>
            </Link>
              </Form>
            
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
  )
  
};

export default HomeAdmin;
