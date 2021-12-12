import React, { Suspense, useState } from "react";
import { Container, Form, Button, Card, Image, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import useInput from "../../../hooks/useInput";
import Notification from "../../../utils/Notification";
import UserFound from "../../../components/UserFound";

// import Link from "next/link";

const SearchUser = () => {
  const [dniValidation, setDniValidation] = useState({
    status: true,
    error: "",
  });

  const handleDniValidation = () => {
    if (!dni.value.match("^[0-9]+$")) {
      return setDniValidation({
        status: false,
        error: "El DNI debe tener sólo números.",
      });
    } else if (dni.value.length < 7 || dni.value.length > 8) {
      return setDniValidation({
        status: false,
        error: "El DNI debe tener sólo entre 7 y 8 caracteres.",
      });
    } else {
      return setDniValidation({ status: true, error: "" });
    }
  };
  const router = useRouter();
  const dni = useInput("DNI");
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    if (!dniValidation.status) {
      Notification.errorMessage("Hay campos erroneos");
      return false;
    }

    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/getOneUser/${dni.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        param: JSON.stringify({
          dni: dni.value,
        }),
      });
      const success = await res.json();

      if (success.success) {
        return router.push(`/admin/edit/user/${success.data.dni}`);
      } else {
        return Notification.errorMessage(success.successMessage);
      }
    } catch (e) {
      return Notification.errorMessage("Por favor ingrese un DNI");
    }
  };

  return (
    <Container>
      {!user.data ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <h1 style={{ marginBottom: "15%" }}>Ingresá un DNI:</h1>
          <Form onSubmit={handleSubmit}>
            <div className={dniValidation.status ? "field" : "field error"}>
              <input
                onBlur={handleDniValidation}
                equired
                placeholder="DNI"
                style={{ width: "75%" }}
                {...dni}
              />
              {!dniValidation.status ? (
                <label>{dniValidation.error}</label>
              ) : null}
            </div>
            <Button
              primary
              size="huge"
              type="submit"
              style={{ marginBottom: "10%", marginTop: "10%" }}
            >
              Enviar
            </Button>


          </Form>
          <Button animated onClick={()=>router.back()} >
      <Button.Content visible>Atrás</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow left' />
      </Button.Content>
    </Button>
        </Container>
      ) : (
        <UserFound user={user} />
      )}
    </Container>
  );
};

export default SearchUser;
