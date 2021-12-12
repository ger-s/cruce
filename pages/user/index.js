import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Icon, Container, Form } from "semantic-ui-react";

import Notification from "../../utils/Notification";

import { useRouter } from "next/router";

const HomeUser = ({ parse }) => {
  const router = useRouter();
  const [state, setState] = useState(true);
  const [form, setForm] = useState({
    email: "",
    phone: ""
  });

  const [phoneValidation, setPhoneValidation] = useState({
    status: true,
    error: ""
  });
  const [emailValidation, setEmailValidation] = useState({
    status: true,
    error: ""
  });

  const handleEmailValidation = () => {
    if (form.email.match(/^\S+@\S+\.\S+$/)) {
      return setEmailValidation({ status: true, error: "" });
    } else {
      return setEmailValidation({
        status: false,
        error: "Ingresá un email válido."
      });
    }
  };

  const handlePhoneValidation = () => {
    if (form.phone.length < 5|| form.phone.length >12) {
      return setPhoneValidation({
        status: false,
        error: "Debe tener entre 5 y 12 dígitos"
      });
    }else if (form.phone.match("^[0-9]*$")) {
      return setPhoneValidation({ status: true, error: "Debe tener solo números" });
    }  else {
      return setPhoneValidation({
        status: false,
        error: "Ingresá un teléfono válido."
      });
    }
  };

  const change = async (e) => {
    setState(!state);
  };

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  useEffect(async () => {
    try {
      const res = await fetch(`/api/user/me/${parse.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const success = await res.json();
      if (success.success) {
        // setUser(success.data);
        setForm({
          ...form,
          email: success.data.email,
          phone: success.data.phone
        });
      }
    } catch (e) {}
  }, [parse, state]);

  const update = async (e) => {
    if (!phoneValidation.status || !emailValidation.status) {
      Notification.errorMessage("Hay campos erroneos");
      return false;
    }
    try {
      const res = await fetch(`/api/user/edit/${parse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          phone: form.phone
        })
      });
      const success = await res.json();
      if (success.success) {
        Notification.successMessage(success.successMessage);
        change();
      }
    } catch (e) {}
  };

  return (
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
              <Card.Header>{parse.name}</Card.Header>
              <Card.Meta>{parse.lastName}</Card.Meta>
              <Card.Description>DNI: {parse.dni}</Card.Description>
              <Card.Description>Email: {form.email} </Card.Description>
              <Card.Description>Telefono: {form.phone}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={change}>
                  Editar mis datos
                </Button>
                <Link href={`/user/editPassword`}>
                  <Button basic color="black">
                    Cambiar contraseña
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
          <Container>
            <Card.Content>
              <Button animated onClick={() => router.back()}>
                <Button.Content visible>Volver atrás</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </Card.Content>
          </Container>
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
                <Card.Header>{parse.name}</Card.Header>
                <Card.Description>{parse.lastName}</Card.Description>

                <Card.Description>DNI: {parse.dni}</Card.Description>
                <Card.Description>
                  <div
                    onBlur={handleEmailValidation}
                    className={emailValidation.status ? "field" : "field error"}
                  >
                    Email:
                    <input
                      value={form.email}
                      type="email"
                      name="email"
                      onChange={handleInput}
                      required
                    />
                    {!emailValidation.status ? (
                      <label>{emailValidation.error}</label>
                    ) : null}
                  </div>
                </Card.Description>
                <Card.Description>
                  <div
                    onBlur={handlePhoneValidation}
                    className={phoneValidation.status ? "field" : "field error"}
                  >
                    Teléfono:
                    <input
                      value={form.phone}
                      type="text"
                      name="phone"
                      onChange={handleInput}
                      required
                    />
                    {!phoneValidation.status ? (
                      <label>{phoneValidation.error}</label>
                    ) : null}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green" onClick={update}>
                    Confirmar cambios
                  </Button>
                </div>
              </Card.Content>
            </Card>

            <Container>
              <Card.Content>
                <Button animated onClick={() => change()}>
                  <Button.Content visible>Atrás</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow left" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Container>
          </Container>
        </Form>
      )}
    </Container>
  );
};

export default HomeUser;
