import { Button, Form } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";

import { secretSalt } from "../secret.json";
import bcrypt from "bcryptjs";

function passwordForget() {
  const [emailValidation, setEmailValidation] = useState(false);
  const [codeValidation, setCodeValidation] = useState(false);
  const [newPass, setNewPass] = useState(false);

  const email = useInput("email");
  const code = useInput("code");
  const password = useInput("password");
  const verification = useInput("verification");

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value
        })
      });
      const success = await res.json();
      if (success.body.code) {
        localStorage.setItem("code", success.body.code);
        setEmailValidation(true);
      }
    } catch (err) {
      console.log(err);
      Notification.errorMessage(err);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const hashCode = await bcrypt.hash(
        code.value,
        bcrypt.genSalt(secretSalt)
      );
      if (hashCode === localStorage.getItem("code")) {
        setCodeValidation(true);
      }
    } catch (err) {
      console.log(err);
      Notification.errorMessage(err);
    }
  };

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    try {
      if (password.value !== verification.value) {
        Notification.errorMessage("Las contraseñas no coinciden");
        return false;
      }

      const res = await fetch("/api/resetPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          code: code.value
        })
      });
    } catch (err) {
      console.log(err);
      Notification.errorMessage(err);
    }
  };

  return (
    <Container>
      {!emailValidation ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={handleSubmitEmail}>
            <Form.Field>
              <label>
                <h3>Email</h3>
              </label>
              <input placeholder="Email" style={{ width: "75%" }} />
            </Form.Field>

            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      ) : !codeValidation ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={handleSubmitCode}>
            <Form.Field>
              <label>
                <h3>Codigo</h3>
              </label>
              <input placeholder="Email" style={{ width: "75%" }} />
            </Form.Field>
            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      ) : (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={handleSubmitReset}>
            <Form.Field>
              <label>
                <h3>Nueva contraseña</h3>
              </label>
              <input type="password" style={{ width: "75%" }} />
            </Form.Field>

            <Form.Field>
              <label>
                <h3>Reingrese contraseña</h3>
              </label>
              <input type="password" style={{ width: "75%" }} />
            </Form.Field>
            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      )}

      {/* ---------- */}
    </Container>
  );
}

export default passwordForget;
