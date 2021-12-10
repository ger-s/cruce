import { Button, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import bcryptjs from "bcryptjs";

const PasswordForget = () => {

  const router = useRouter()
  const [currentStep, setCurrentStep] = useState('');

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
      if (success.body.success) {
        setCurrentStep('code');
        localStorage.setItem("code", JSON.stringify(success.body.code));
        return Notification.successMessage('Código enviado a tu correo')
      } else {
        return Notification.errorMessage(success.body.successMessage)
      }
    } catch (err) {
      return Notification.errorMessage(err);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const parseLocal = await JSON.parse(localStorage.getItem("code"))
      const comparation = await bcryptjs.compare(code.value, parseLocal)
      if (comparation) {
        setCurrentStep('pass');
        return Notification.successMessage('Código correcto')
      } else {
        Notification.errorMessage('Código incorrecto')
      }
    } catch (err) {
      Notification.errorMessage(err);
      return console.log(err);
    }
  };

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    try {
      if (password.value.toString() !== verification.value.toString()) {
        return Notification.errorMessage("Las contraseñas no coinciden");
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
      const success = await res.json()
      if (success.body.success) {
        localStorage.removeItem('code')
        router.push('/login')
        return Notification.successMessage(success.body.successMessage);
      }
    } catch (err) {
      console.log(err);
      return Notification.errorMessage(err);
    }
  };
  useEffect(() => {
     if (currentStep === '') setCurrentStep('email')
  }, [currentStep])

  return (
    <Container>
      {currentStep === 'email' ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <h1 style={{ marginBottom: "15%" }}>Ingresá tu correo:</h1>
          <Form onSubmit={handleSubmitEmail}>
            <Form.Field>
             
              <input placeholder="Email" style={{ width: "75%" }} {...email} />
            </Form.Field>

            <Button  primary size="huge" type="submit" style={{ marginBottom: "50%" , marginTop: "10%" }}>Enviar</Button>
          </Form>
        </Container>
      ) : null}
      {currentStep === 'code' ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <h1 style={{ marginBottom: "15%" }}>Ingresá el código de 6 dígitos:</h1>
          <Form onSubmit={handleSubmitCode}>
            <Form.Field>
             
              <input placeholder="código" style={{ width: "75%" }} {...code}/>
            </Form.Field>
            <Button type="submit" primary size="huge" style={{ marginBottom: "50%" , marginTop: "10%" }}>Enviar</Button>
          </Form>
        </Container>
      ) : null}
      { currentStep === 'pass' ? (
      <Container textAlign="center" style={{ marginTop: "20%" }}>
        <h1 style={{ marginBottom: "15%" }}>Ingresá una nueva contraseña:</h1>
          <Form onSubmit={handleSubmitReset}>
            <Form.Field>
             
              <input placeholder="Nueva contraseña" type="password" style={{ width: "75%" }} {...password}/>
            </Form.Field>

            <Form.Field>
              
              <input placeholder="Reingrese contraseña" type="password" style={{ width: "75%" }} {...verification} />
            </Form.Field>
            <Button type="submit" primary size="huge" style={{ marginBottom: "30%" , marginTop: "10%" }} >Enviar</Button>
          </Form>
        </Container>
      ) : null}

     
    </Container>
  );
}

export default PasswordForget;
