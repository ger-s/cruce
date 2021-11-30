import { Button, Form } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";

const Register = () => {
  const router = useRouter();

  const email = useInput("email");
  const password = useInput("password");
  const name = useInput("name");
  const lastName = useInput("lastName");
  const dni = useInput("DNI");
  const phone = useInput("phone");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          lastName: lastName.value,
          password: password.value,
          dni: dni.value,
          email: email.value,
          phone: phone.value,
        }),
      });
      const data = await res.json()
    
      console.log(data);
      if (data) {
        Notification.successMessage("bien");
        return router.push("/login");
      } else {
        Notification.errorMessage("Oops...");
      }
    } catch (error) {
      Notification.errorMessage("Oops...");
    }
  };

  return (
    <Container>
      <Container textAlign="center" style={{ marginTop: "20%" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>
              <h3>Nombre</h3>
            </label>
            <input placeholder="Nombre" style={{ width: "75%" }} {...name} />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Apellido</h3>
            </label>
            <input
              placeholder="Apellido"
              style={{ width: "75%" }}
              {...lastName}
            />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>DNI</h3>
            </label>
            <input placeholder="DNI" style={{ width: "75%" }} {...dni} />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Email</h3>
            </label>
            <input placeholder="Email" style={{ width: "75%" }} {...email} />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Teléfono</h3>
            </label>
            <input placeholder="Teléfono" style={{ width: "75%" }} {...phone} />
          </Form.Field>
          <Form.Field>
            <label>
              <h3>Contraseña</h3>
            </label>
            <input
              placeholder="Contraseña"
              style={{ width: "75%" }}
              {...password}
            />
          </Form.Field>
          <Button type="submit">Enviar</Button>
        </Form>
        <p>
          ¿Ya tenés cuenta? <Link href="/login">logueate</Link>.
        </p>
      </Container>
    </Container>
  );
};

export default Register;
