import React, { Suspense, useState } from "react";
import { Container, Form, Button, Card, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import useInput from "../../../hooks/useInput";
import Notification from "../../../utils/Notification";
import UserFound from "../../../components/UserFound";
// import Link from "next/link";

function user() {
  const router = useRouter();
   const dni = useInput("DNI");
  // const [user, setUser] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/getOneUser/${dni.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        param: JSON.stringify({
          dni: dni.value
        })
      });
      const success = await res.json();
     

      if (success.success) {
        // localStorage.setItem("dni", JSON.stringify(success.data));
          return router.push(`/admin/edit/user/${success.data.dni}`);
        // setUser(success);
      }else{
        return Notification.errorMessage(success.successMessage);
      }
    } catch (e) {
      return Notification.errorMessage("Por favor ingrese un DNI");
    }
  };

  return (
    <Container>
      {/* {!user.data ? ( */}
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <h1 style={{ marginBottom: "15%" }}>Ingresá un DNI:</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <input placeholder="DNI" style={{ width: "75%" }} {...dni} />
            </Form.Field>
            <Button
              primary
              size="huge"
              type="submit"
              style={{ marginBottom: "50%", marginTop: "10%" }}
            >
              Enviar
            </Button>
          </Form>
        </Container>
      // ) : (
        // <UserFound user={user} />
      // )
    </Container>
  );
}

export default user;
