import { Button, Form } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
const { jwtPass } = require("../secret.json");

const Login = ({ size, parse }) => {
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

      console.log("success =>>>>>>>>",success);
      if (success.body.success) {
        localStorage.setItem(
          "token",
          JSON.stringify(success.headers.Authorization)
        );
        Notification.successMessage(success.body.successMessage);
        return router.reload()
      } else {
        Notification.errorMessage(success.body.successMessage);
      }
    } catch (err) {
      Notification.errorMessage(err);
    }
  };

  useEffect(() => {
    parse.dni ? router.push('/') : null
  }, [parse])

  return (
    <Container>
      <Container textAlign="center" style={{ marginTop: "10%" }}>
        <h1 className="ui header" style={{ marginBottom: "10%" }}>
          INICIAR SESIÓN
        </h1>

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              <h3>Email</h3>
            </label>
            <input
              placeholder="maria@gmail.com"
              style={
                size.width / size.height > 0.7
                  ? { width: "55%" }
                  : { width: "75%" }
              }
              {...email}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Contraseña</h3>
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              style={
                size.width / size.height > 0.7
                  ? { width: "55%" }
                  : { width: "75%" }
              }
              {...password}
            />
          </Form.Field>
          <Form.Field>
            <p style={{ marginBottom: "8%" }}>
              <Link href="/passwordForget">Olvidé mi contraseña</Link>.
            </p>
          </Form.Field>
          <button
            style={{ margin: "5% 0%" }}
            className={`ui animated primary huge submit button`}
            type="submit"
            tabIndex="0"
          >
            <div className="visible content"> Iniciar sesión </div>
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          </button>
        </Form>
        <p style={{ marginTop: "5%" }}>
          ¿No tenés cuenta? <Link href="/register"> Registrate </Link>.
        </p>
      </Container>
    </Container>
  );
};

export default Login;
