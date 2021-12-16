import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Image, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import Notification from "../../../../utils/Notification";
import Swal from "sweetalert2";


const UserDni = () => {
  const router = useRouter();
  const query = router.query;
  const [user, setUser] = useState({});
  const [sucursales, setSucursales] = useState([])
  const [sucursalSelection, setSucursalSelection] = useState('')
  const [state, setState] = useState(true);
  const [rol, setRol] = useState({});
  const [todasSucursales, setTodasSucursales] = useState([])
 
  const { value } = rol;

  const handleSelection = async (e) => {
    e.preventDefault();
    try {
      const str = sucursales.find(sucursal => sucursal.text === e.target.textContent)
      setSucursalSelection(str.value)
    } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (rol.value === 'user') {
      todasSucursales.map(sucursal => {
        if ((sucursal.operators.filter(operator => operator.dni === user.dni)).length > 0) {
          setSucursalSelection(sucursal._id)
        }
      })
    }
  }, [rol])

  useEffect(async () => {
    try {
      const suc = await fetch('/api/admin/getAllSucursales', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      })
      const succ3ss = await suc.json()

      const res = await fetch(`/api/admin/getOneUser/${query.dni}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
      const success = await res.json();
      if (success.success && succ3ss.success) {
        setTodasSucursales(succ3ss.data)
        if (sucursales.length  < 1) {
          succ3ss.data.map((sucursal, index) =>
              setSucursales((old) => [...old, { key: index, text: sucursal.name, value: sucursal._id}])
            );
        }
        setUser(success.data);
        !rol ? setRol({ value: success.data.role }) : null
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
      if (rol.value === 'operator') {
        const updateOperator = await fetch(`/api/admin/edit/sucursal/${sucursalSelection}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            lastName: user.lastName,
            dni: user.dni,
            email: user.email
          }),
        });
        const succ3ss = await updateOperator.json()

        const res = await fetch(`/api/admin/edit/user/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({
            role: rol.value,
          })
        });

        const success = await res.json()

        if (succ3ss.success && success.success) {
          change();
          return Notification.successMessage(success.successMessage)
        } else {
          return Notification.errorMessage(success.successMessage, succ3ss.successMessage);
        }
      }
      if (rol.value === 'user') {
        const res = await fetch(`/api/admin/edit/user/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({
            role: rol.value,
            _id: sucursalSelection,
            dni: user.dni
          })
        });
        const success = await res.json();
        if (success.success) {
          change();
          return Notification.successMessage(success.successMessage);
        }
      }
    } catch (e) {
      Notification.errorMessage("Ha ocurrido un error");
    }
  };



  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      const swal = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Estos cambios no se podrán revertir!",
        icon: "¡Atención!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });
      if(swal.isConfirmed){ 
      const res = await fetch(`/api/admin/delete/user/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const success =  res.json();
      if (success) {
        Swal.fire("¡Eliminado!", "Usuario eliminado.", "success");
        return router.push("/admin/search/user");
      }else {
        return Notification.errorMessage("Ha ocurrido un error");
      }
    }
    } catch (e) {
      return Notification.errorMessage(e);
    }
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
              <Card.Description>Teléfono: {user.phone}</Card.Description>
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
            <div className="visible content"> Atrás </div>
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
                  {rol.value === 'operator' ? (<Form.Input required>
                    <Dropdown
                      placeholder="Sucursal..."
                      search
                      selection
                      options={sucursales}
                      onChange={handleSelection}
                      
                      //style={{ height: "70px" }}
                    />
                  </Form.Input>) : null}
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
