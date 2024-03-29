import React, { useEffect, useState }  from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import useInput              from "../../../../hooks/useInput";
import Notification          from "../../../../utils/Notification";
import { useRouter }         from "next/router";


const CreateSucursal = ({size}) => {
  const router      = useRouter();
  const query       = router.query;
  
  const name        = useInput("name");
  const address     = useInput("address");
  const zipCode     = useInput("zipCode");
  const city        = useInput("city");
  const phone     = useInput("phone");
  const openingTime = useInput("openingTime");
  const closingTime = useInput("closingTime");
  
  const [form, setForm] = useState({
    name: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
    openingTime: "",
    closingTime: "",
  });


  useEffect(async () => {
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${query._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        param: JSON.stringify({
            _id: query._id
          })
      });
      const { data, success, successMessage } = await res.json();
    
      if (success) {
        setForm({
          ...form,
          name: data.name,
          address: data.address,
          zipCode: data.zipCode,
          city: data.city,
          phone: data.phone,
          openingTime: data.openingTime,
          closingTime: data.closingTime
      });
      } 
      else {
        Notification.errorMessage("Ha habido un error");
      }

    } catch (error) {
      Notification.errorMessage(error);
    }
  }, [query._id]);
  

  const handleInput = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/edit/sucursal/${query._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          zipCode: form.zipCode,
          city: form.city,
          phone: form.phone,
          openingTime: form.openingTime,
          closingTime: form.closingTime,
        }),
      });
      const { data, success, successMessage } = await res.json();

      if (success) {
        Notification.successMessage(successMessage);
        return router.push("/admin");
      } 
      else {
        Notification.errorMessage(successMessage);
      }
    } catch (error) {
      Notification.errorMessage(error);
    }
  };


  return (
    <Container>
      <Container textAlign="center" style={size.width / size.height > 0.7 ? { marginTop: "10%" } : { marginTop: "15%" }}>
        
        <h1 className="ui header"  style={{ marginBottom: "10%" }}> EDITAR SUCURSAL </h1>
        
        <form className="ui form" onSubmit={handleSubmit}>
          <div style={{marginTop: "4%" }}>
            <input
              value= {form.name}
              type="text"
              placeholder="Nombre"
              name="name"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.address}
              type="text"
              placeholder="Dirección"
              name="address"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.zipCode}
              type="text"
              placeholder="Código postal"
              name="zipCode"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.city}
              type="text"
              placeholder="Ciudad"
              name="city"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.phone}
              type="number"
              placeholder="Teléfono"
              name="phone"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.openingTime}
              type="text"
              placeholder="Hora de Apertura"
              name="openingTime"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              value= {form.closingTime}
              type="text"
              placeholder="Hora de Cierre"
              name="closingTime"
              onChange={handleInput}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "10%",marginBottom:"5%" }}>
            <Button
            primary
            size="huge"
            type="submit"
            style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
          >
            Confirmar
          </Button>
          </div>
        </form>
        <Button animated onClick={()=>router.back()}  >
      <Button.Content visible>Atrás</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
      </Container>
    </Container>
  );
};

export default CreateSucursal;
