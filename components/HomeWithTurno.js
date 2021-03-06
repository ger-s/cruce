import React, { useEffect, useState } from "react";
import { Card, Icon, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Notification from '../utils/Notification'
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const HomeWithTurno = ({size, turno, parse}) => {

  const router = useRouter()
  const today = new Date()
  const todaySeconds = today.getTime() / 1000
  const turnoSeconds = turno[0].date ? (new Date (turno[0].date).getTime() / 1000) + 10800 : null

  const [counter, setCounter] = useState(Math.round(turnoSeconds - todaySeconds))

  const handleDelete = async (e) => {
    e.preventDefault()
    if (counter > 7200) {
      try {
        const confirm  = await Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir la cancelación",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Borrar',
          cancelButtonText: 'Volver'
        })
        if (confirm.isConfirmed) {
          const res = await fetch(`/api/admin/delete/sucursal/historyItem/${turno[1]._id}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token")

            },
            body: JSON.stringify({
              dni: parse.dni,
              _id: turno[0]._id,
              sucursalName: turno[1].name,
            horaTurno: `${turno[0].date}`
          })
        })
        try {
          const res = await fetch(`/api/user/me/${parse.dni}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            }
          });
          const success = await res.json();
        } catch (error) {}
  



        const success = await res.json()
        if (success.success) {
          Notification.successMessage(success.successMessage)
          setTimeout(()=> router.reload(), 2000)
        } else {
          console.log(success.successMessage)
        }}
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
  if(counter === 86400) {
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
        
      if (success.success) {

      } else {
        return Notification.errorMessage(success.successMessage);
      } 

    }catch(error) {
      return Notification.errorMessage("Seleccioná una sucursal");
    }
  }
  
}, [counter, parse])

  return (
    <motion.div
    className="ui container fluid"
          initial={{ y: "-100vw" }}
          animate={{ y: 0 }}
          transition={{ stiffness: 150 }}>
    <div
        className="ui container"
        style={size.width / size.height > 0.7 ? {
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "7%",
          marginBottom: "24%",
        } : {
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "10%",
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
                {`Hora: ${(Number(new Date(turno[0].date).toLocaleTimeString('es-AR').slice(0,2)) + 3)}${new Date(turno[0].date).toLocaleTimeString('es-AR').slice(2,5)}`}<br/>
                
                { counter < 86400?
                  (`Quedan: ${Math.floor(counter/3600)}:${Math.floor((counter/60) % 60)}:${counter % 60}`) : (null)
                }


                <div >
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <div className="ui container two buttons" style={{padding: "10%"}}>
              <Button icon color="red" onClick={handleDelete}>
                <Icon name="trash" />
              </Button>
              </div>
              <p style={{color: 'black'}}> ¿Necesitás cambiar el turno?, eliminá el existente, y pedí uno nuevo en el horario deseado. </p>
            </Card.Content>
          </Card>
        </div>
      </div>
      </motion.div>
  )
}


export default HomeWithTurno