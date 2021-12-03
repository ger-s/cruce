import Link from "next/link";
import { useEffect , useState} from "react";
import { Container } from "semantic-ui-react";


export default function Home() {
  const [user, setUser] = useState([])
  
  useEffect(() => {

    const local = JSON.parse(localStorage?.getItem("token"))
    setUser(local)
  },[])
  return (
    <div>
      <Container>
        <Container textAlign="center" style={{ margin: "25vh", width: "75%" }}>
          <h1 style={{ fontSize: "250%", marginBottom: "6%" }}> ¡Bienvenido a Cruce! </h1>
          <p style={{ fontSize: "200%" }}> 
            <Link href={user? "/turno" : "/login"}>  Reservá tu turno acá </Link> 
          </p>
        </Container>
      </Container>
    </div>
  );
}
