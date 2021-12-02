import { Button, Form } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import jwt from "jsonwebtoken";
const { jwtPass } = require("../secret.json");

const Login = ({size}) => {
  const router = useRouter();

  const email = useInput("email");
  const password = useInput("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });
      const success = await res.json();
      console.log(success,"dasdasd");

      if (success.success) {
        localStorage.setItem("token", JSON.stringify(success.headers.Authorization));
        Notification.successMessage(success.body.successMessage);
        return router.push("/");
      } else {
        Notification.errorMessage(success.body.successMessage);
      }
    } catch (err) {
      Notification.errorMessage(err);
    }
  };

  return (
    <Container>
      <Container textAlign="center" style={{ marginTop: "20%" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              <h3>Email</h3>
            </label>
            <input placeholder="Email" style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }} {...email} />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Contraseña</h3>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...password}
            />
          </Form.Field>
          <Form.Field>
            <p>
              <Link href="/passwordForget">Olvidé mi contraseña</Link>.
            </p>
          </Form.Field>
          <Button type="submit">Enviar</Button>
        </Form>
        <p>
          ¿No tenés cuenta? <Link href="/register">registrate</Link>.
        </p>
      </Container>
    </Container>
  );
};

export default Login;
