import React, { useEffect, useState }  from "react";
import { Container, Button } from "semantic-ui-react";
import useInput              from "../../../../hooks/useInput";
import Notification          from "../../../../utils/Notification";
import { useRouter }         from "next/router";





const CreateSucursal = ({size}) => {
  const router      = useRouter();
  const query       = router.query;

  const [sucursal, setSucursal] = useState({});
  
  const name        = useInput("name");
  const address     = useInput("address");
  const phone       = useInput("phone");
  const openingTime = useInput("openingTime");
  const closingTime = useInput("closingTime");







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
      console.log("DATAAAA", data)
      console.log("SUCCESSSS", success)
      console.log("MESSAGEEE", successMessage)

      if (success) {
        setSucursal(data);
      } 
      else {
        Notification.errorMessage(successMessage);
      }

    } catch (error) {
      Notification.errorMessage(error);
    }
  }, [query._id]);


  return (
    <Container>
      <Container textAlign="center" style={size.width / size.height > 0.7 ? { marginTop: "10%" } : { marginTop: "15%" }}>
        
        <h1 className="ui header"  style={{ marginBottom: "10%" }}> EDITAR SUCURSAL </h1>
        
        <form className="ui form" /* onSubmit={handleSubmit} */>
          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              value= {sucursal.name}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              value= {sucursal.address}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="number"
              value= {sucursal.phone}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              value= {sucursal.openingTime}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              required
            />
          </div>

          <div style={{marginTop: "4%" }}>
            <input
              type="text"
              value= {sucursal.closingTime}
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
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
