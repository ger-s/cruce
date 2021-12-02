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
      if (success.body.code) {
        setCurrentStep('code');
        localStorage.setItem("code", JSON.stringify(success.body.code));
        return console.log('se mando bien el mail')
      }
    } catch (err) {
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
        console.log('no son iguales')
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
      if (success.success) {
        localStorage.removeItem('code')
        router.push('/login')
        return Notification.successMessage('todo salio biennnnn');
      }
    } catch (err) {
      Notification.errorMessage(err);
      return console.log('a ver si entra aca', err);
    }
  };

  useEffect(() => {
    if (currentStep === '') setCurrentStep('email')
 }, [email])

  useEffect(() => {
     if (currentStep === '') setCurrentStep('email')
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
      ) : null}
      {currentStep === 'code' ? (
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
      ) : null}
      { currentStep === 'pass' ? (
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
      ) : null}

      {/* ---------- */}
    </Container>
  );
}

export default PasswordForget;
