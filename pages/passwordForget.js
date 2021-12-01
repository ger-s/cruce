import { Button, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
//import Link from "next/link";
//import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";

const { secretSalt } = require("../secret.json");
import bcryptjs from "bcryptjs";

function passwordForget() {
  const [currentStep, setCurrentStep] = useState('email');

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
      console.log(success)
      if (success.body.code) {
        setCurrentStep('code');
        localStorage.setItem("code", JSON.stringify(success.body.code));
        return console.log('se mando bien el mail')
      }
    } catch (err) {
      console.log('hola, hubo error', err);
      Notification.errorMessage(err);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const parseLocal = JSON.parse(localStorage.getItem("code"))
      if (bcryptjs.compare(code.value, parseLocal)) {
        return setCurrentStep('pass');
      } else {
        console.log(code.value)
        console.log(parseLocal)
        console.log('no dan igual')
      }
    } catch (err) {
      Notification.errorMessage(err);
      return console.log(err);
    }
  };

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    try {
      if (password.value !== verification.value) {
        Notification.errorMessage("Las contraseñas no coinciden");
        return console.log('eyyyyy');
      }
      console.log(email.value)
      console.log(code.value)
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
      const success = res.json()
      if (success.success) {
        return console.log('todo salio biennnnn')
      }
    } catch (err) {
      console.log('a ver si entra aca', err);
      Notification.errorMessage(err);
    }
  };

  useEffect(() => {
    console.log(currentStep)
  }, [currentStep])

  return (
    <Container>
      {currentStep === 'email' ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={handleSubmitEmail}>
            <Form.Field>
              <label>
                <h3>Email</h3>
              </label>
              <input placeholder="Email" style={{ width: "75%" }} {...email} />
            </Form.Field>

            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      ) : (currentStep === 'code' ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={handleSubmitCode}>
            <Form.Field>
              <label>
                <h3>Código</h3>
              </label>
              <input placeholder="código" style={{ width: "75%" }} {...code}/>
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
              <input type="password" style={{ width: "75%" }} {...password}/>
            </Form.Field>

            <Form.Field>
              <label>
                <h3>Reingrese contraseña</h3>
              </label>
              <input type="password" style={{ width: "75%" }} {...verification} />
            </Form.Field>
            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      ))}

      {/* ---------- */}
    </Container>
  );
}

export default passwordForget;
