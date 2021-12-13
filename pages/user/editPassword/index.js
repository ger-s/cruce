import { Button, Form, Container, Icon } from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";

import useInput from "../../../hooks/useInput";
import Notification from "../../../utils/Notification";

const EditPassword = ({ size, parse }) => {
  const router = useRouter();

  const currentPassword = useInput("password");
  const newPassword = useInput("password");
  const pass = useInput("password");

  const [currentPassValidation, setCurrentPassValidation] = useState({
    status: true,
    error: ""
  });

  const [passValidation, setPassValidation] = useState({
    status: true,
    error: ""
  });
  const [confirmPassValidation, setConfirmPassValidation] = useState({
    status: true,
    error: ""
  });

  const handleCurrentPassValidation = () => {
    if (currentPassword.value.length > 7 && currentPassword.value.length < 30) {
      return setCurrentPassValidation({ status: true, error: "" });
    } else {
      return setCurrentPassValidation({
        status: false,
        error: "La contraseña sólo puede tener entre 8 y 30 caracteres."
      });
    }
  };

  const handlePassValidation = () => {
    if (pass.value.length > 7 && pass.value.length < 30) {
      return setPassValidation({ status: true, error: "" });
    } else {
      return setPassValidation({
        status: false,
        error: "La contraseña sólo puede tener entre 8 y 30 caracteres."
      });
    }
  };
  const handleConfirmPassValidation = () => {
    if (pass.value === newPassword.value) {
      return setConfirmPassValidation({ status: true, error: "" });
    } else {
      return setConfirmPassValidation({
        status: false,
        error: "Las contraseñas no coinciden"
      });
    }
  };

  const handleSubmit = async (e) => {
    if (
      !currentPassValidation.status ||
      !confirmPassValidation.status ||
      !passValidation.status
    ) {
      Notification.errorMessage("Hay campos erróneos");
      return false;
    }
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/edit/${parse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: parse.email,
          passConfirmation: currentPassword.value,
          newPassword: newPassword.value
        })
      });
      const success = await res.json();
      if (success.success) {
        Notification.successMessage("Contraseña modificada exitosamente");
        return router.push("/user");
      } else {
        return Notification.errorMessage("No se pudo modificar la contraseña");
      }
    } catch (e) {}
  };

  return (
    <Container>
      <Container textAlign="center" style={{ marginTop: "10%" }}>
        <h1 className="ui header" style={{ marginBottom: "10%" }}>
          EDITAR CONTRASEÑA
        </h1>

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              <h3>Contraseña actual</h3>
            </label>
            <div
              onBlur={handleCurrentPassValidation}
              className={currentPassValidation.status ? "field" : "field error"}
            >
              <input
                required
                type="password"
                style={
                  size.width / size.height > 0.7
                    ? { width: "55%" }
                    : { width: "75%" }
                }
                {...currentPassword}
              />
              {!currentPassValidation.status ? (
                <label>{currentPassValidation.error}</label>
              ) : null}
            </div>
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Contraseña nueva</h3>
            </label>
            <div
              onBlur={handlePassValidation}
              className={passValidation.status ? "field" : "field error"}
            >
              <input
                required
                type="password"
                placeholder="Contraseña de entre 8 y 30 caracteres"
                style={
                  size.width / size.height > 0.7
                    ? { width: "55%" }
                    : { width: "75%" }
                }
                {...pass}
              />
              {!passValidation.status ? (
                <label>{passValidation.error}</label>
              ) : null}
            </div>
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Confirmar contraseña</h3>
            </label>
            <div
              onBlur={handleConfirmPassValidation}
              className={confirmPassValidation.status ? "field" : "field error"}
            >
              <input
                required
                type="password"
                style={
                  size.width / size.height > 0.7
                    ? { width: "55%" }
                    : { width: "75%" }
                }
                {...newPassword}
              />
              {!confirmPassValidation.status ? (
                <label>{confirmPassValidation.error}</label>
              ) : null}
            </div>
          </Form.Field>

          <button
            style={{ margin: "5% 0%" }}
            className={`ui animated primary huge submit button ${
              !currentPassValidation.status ||
              !confirmPassValidation.status ||
              !passValidation.status
                ? `disabled`
                : null
            }`}
            type="submit"
            tabIndex="0"
          >
            <div className="visible content"> Confirmar </div>
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          </button>
        </Form>

        <Button animated onClick={() => router.back()}>
          <Button.Content visible>Atrás</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
      </Container>
    </Container>
  );
};

export default EditPassword;
