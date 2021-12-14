import Link from "next/link";
import { useEffect , useState} from "react";
import { Container } from "semantic-ui-react";
import HomeWithTurno from "../components/HomeWithTurno";


export default function Home({parse}) {

  const [sucursales, setSucursales] = useState([])


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
        success.data.map(async (sucursal) => {
          const fil = sucursal.history.filter((history) => (history.client.dni === parse.dni) && (history.state === 'pendiente'))
          if (fil[0]?.client) {
            if ((new Date(fil[0].date).getTime()) < (new Date().getTime())) {
              const res = await fetch(`/api/user/me/${parse.dni}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token")
                }
              })
              const success = await res.json()
              if (success.success) {
                console.log('ey')
              } else {
                console.log(success.successMessage)
              }
            } else {
              setSucursales([fil[0], sucursal])
            }
          }
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
      < HomeWithTurno turno={sucursales} parse={parse}/>
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
