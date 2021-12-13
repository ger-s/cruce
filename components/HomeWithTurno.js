import React, { useEffect, useState } from "react";
import { Card, Container, Icon, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Notification from '../utils/Notification'
import { addScaleCorrector, motion } from "framer-motion";


const HomeWithTurno = ({size, turno}) => {
  const router = useRouter()
  const today = new Date()
  const todaySeconds = today.getTime() / 1000
  const turnoSeconds = turno[0].date ? new Date (turno[0].date).getTime() / 1000 : null

  const [counter, setCounter] = useState(Math.round(turnoSeconds - todaySeconds))
  const handleDelete = async (e) => {
    e.preventDefault()
    if (counter > 7200) {
      try {
        const res = await fetch(`/api/admin/delete/sucursal/historyItem/${turno[1]._id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")

          },
          body: JSON.stringify({
            _id: turno[0]._id,
            sucursalName: turno[1].name,
            horaTurno: `${turno[0].date.slice(0, 10)}T${Number(turno[0].date.slice(11, 13)) - 3}${turno[0].date.slice(13, 19)}`
          })
        })
  
        const success = await res.json()
        if (success.success) {
          console.log(success)
          Notification.successMessage(success.successMessage)
          router.reload()
        } else {
          console.log(success.successMessage)
        }
      } catch(error) {
        console.log(error)
      }
    } else {
      Notification.errorMessage('Sólo se puede cancelar hasta con 2 horas de antelación')
    }
  }

  useEffect(() => {
    counter > 0 && setTimeout(()=> {setCounter(counter-1)}, 1000)
   
  }, [counter])

useEffect(async()=>  {
  if(counter==="86400") {
    try{
    
      const res = await fetch(`/api/email/${turno[0].client.dni}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")

        },
        body: JSON.stringify({
         _id:turno[1]._id 
        })
      });
      const success = await res.json();
    
      console.log("llegoo", success);
    
      if (success.success) {
        // localStorage.setItem("dni", JSON.stringify(success.data));
        return router.push(`/admin/info/${success.data._id}`);
        // setUser(success);
      } else {
        return Notification.errorMessage(success.successMessage);
      }
    
    }catch(error) {
      return Notification.errorMessage("Seleccioná una sucursal");
    
    }
        }
  
},[counter])

  return (
    <motion.div
    className="ui container fluid"
          initial={{ y: "-100vw" }}
          animate={{ y: 0 }}
          transition={{ stiffness: 150 }}>
    <div
        className="ui container"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "20%",
          marginBottom: "24%",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "20%" }}>El turno elegido:</h1>
          <Card style={{boxShadow: "none", backgroundColor: "gainsboro", padding: "10%"}}>
            <Card.Content>
            <Card.Header>{`${turno[1].name}`}</Card.Header>
              {`Dirección: ${turno[1].address}`}<br/>
              {`Teléfono: ${turno[1].phone}`}
              
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Día: ${new Date(turno[0].date).toLocaleDateString('es-AR')} `}
                <div>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Hora: ${new Date(turno[0].date).toLocaleTimeString('es-AR')}`}<br/>
                {`Quedan: ${Math.floor(counter/3600)}:${Math.floor((counter/60) % 60)}:${counter % 60}`}<br/>

                <div >
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui container two buttons" style={{padding: "10%"}}>
              <Button icon color="red" onClick={handleDelete}>
                <Icon name="trash" />
              </Button>
              </div>
              <p style={{color:"blue", fontWeight:"bold"}}> Para modificar el turno, primero cancelelo y vuelva a sacar otro. </p>
            </Card.Content>
          </Card>
        </div>
      </div>
      </motion.div>
  )
}


export default HomeWithTurno