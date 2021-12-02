import Link from "next/link";
import { Container } from "semantic-ui-react";

export default function Home() {
  return (
    <div>
      <Container>
        <Container textAlign="center" style={{ margin: "25vh", width: "75%" }}>
          <h1 style={{ fontSize: "250%", marginBottom: "10%" }}> ¡Bienvenido a Cruce! </h1>
          <p style={{ fontSize: "200%" }}> 
            <Link href="/login">  Reservá tu turno acá </Link> 
          </p>
        </Container>
      </Container>
    </div>
  );
}
