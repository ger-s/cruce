import { Button, Checkbox, Form } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import jwt from "jsonwebtoken";
import { jwtPass } from "../secret.json"

const Login = () => {
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
      })
      const { success, successMessage, token } = await res.json()


      if (success) {
        const decodToken = jwt.verify(token, jwtPass)
        localStorage.setItem("token", JSON.stringify(decodToken))
        Notification.successMessage(successMessage);
        return router.push("/")
      } else {
        Notification.errorMessage(successMessage);
      }
    } catch (err) {
      Notification.errorMessage(err)
    }
  }


  return (
    <Container>

      <Container
        textAlign='center'
        style={{ marginTop: "20%" }}

      >
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label><h3>Email</h3></label>
            <input placeholder='Email' style={{ width: "75%" }}
              {...email} />
          </Form.Field>
          <Form.Field>
            <label><h3>Contraseña</h3></label>
            <input type='password' placeholder='Contraseña' style={{ width: "75%" }} {...password} />
          </Form.Field>
          <Form.Field>
            <p><Link href="#">Olvidé mi contraseña</Link>.</p>
          </Form.Field>
          <Button type='submit'>Enviar</Button>
        </Form>
        <p>¿No tenés cuenta? <Link href="/register">registrate</Link>.</p>
      </Container>
    </Container>
  )
}

export default Login;