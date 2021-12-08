import React                 from "react";
import { Container, Button } from "semantic-ui-react";
import useInput              from "../../../hooks/useInput";
import Notification          from "../../../utils/Notification";
import { useRouter }         from "next/router";





const CreateSucursal = ({size}) => {
  const router = useRouter();

  const name        = useInput("name");
  const address     = useInput("address");
  const phone       = useInput("phone");
  const openingTime = useInput("openingTime");
  const closingTime = useInput("closingTime");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch es como axios, pero con particularidades
      const res = await fetch("/api/admin/create/sucursal", {
        // se especifica el método
        method: "POST",
        // headers va por default
        headers: {
          "Content-Type": "application/json",
        },
        // es importante que al enviar algo, se haga el stringify
        body: JSON.stringify({
          name: name.value,
          address: address.value,
          phone: phone.value,
          openingTime: openingTime.value,
          closingTime: closingTime.value,
        }),
      });
      // para conseguir la data, no alcanza con desestructurar res
      // hay que convertirlo a json primero
      const { data, success, successMessage } = await res.json();

      if (success) {
        Notification.successMessage(successMessage);
        return router.reload();
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
        
        <h1 className="ui header"  style={{ marginBottom: "10%" }}> ALTA SUCURSAL </h1>
        
        <form className="ui form" onSubmit={handleSubmit}>
          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              placeholder="Nombre"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...name}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              placeholder="Dirección"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...address}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="number"
              placeholder="Teléfono"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...phone}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              placeholder="Hora de Apertura"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...openingTime}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              placeholder="Hora de Cierre"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...closingTime}
              required
            />
          </div>

          <div style={{marginTop: "10%" }}>
            <Button
            primary
            size="huge"
            type="submit"
            style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
          >
            Crear
          </Button>
          </div>
        </form>

      </Container>
    </Container>
  );
};

export default CreateSucursal;
