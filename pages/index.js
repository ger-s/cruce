import Link from "next/link";
import { useEffect , useState} from "react";
import { Container } from "semantic-ui-react";
import HomeWithTurno from "../components/HomeWithTurno";


export default function Home({parse}) {
  const [sucursales, setSucursales] = useState([])

  console.log('esto', sucursales)

  useEffect(async () =>{
    try {
      const res = await fetch("/api/admin/getAllSucursales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
      const success = await res.json();
      if (success.success) {
        success.data.map(sucursal => {
          const fil = sucursal.history.filter(history => (history.client.dni === parse.dni) && (history.state === 'pendiente'))
          fil[0]?.client ? setSucursales([fil[0], sucursal]) : null
        })
      }
    } catch (err) {
      console.log(err);
    }
    //router.push('/logged')
  }, [parse])
  return (
    <>
   {sucursales[0] ? (
      <>
      < HomeWithTurno turno={sucursales}/>
    </>
    ) : ( 
   <div>
      <Container>
        <Container textAlign="center" style={{ margin: "10vh", width: "75%" }}>
          <h1 style={{ fontSize: "250%", marginBottom: "6%" }}> ¡Bienvenido a Cruce! </h1>
          <p style={{ fontSize: "200%", marginBottom: "35vh"  }}> 
            <Link href={parse.dni ? "/turno" : "/login"}>  Reservá tu turno acá </Link> 
          </p>
        </Container>
      </Container>
    </div>)}
    </>
  );
}
