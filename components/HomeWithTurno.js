import React, { useEffect, useState } from "react";
import { Card, Container, Icon, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Notification from '../utils/Notification'
import { motion } from "framer-motion";


const HomeWithTurno = ({size, turno}) => {
  const router = useRouter()
  const today = new Date()
  const todaySeconds = today.getTime() / 1000
  const turnoSeconds = turno[0].date ? new Date (turno[0].date).getTime() / 1000 : null

  const [counter, setCounter] = useState(Math.round(turnoSeconds - todaySeconds))

  const handleDelet = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/admin/delete/sucursal/historyItem/${turno[1]._id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: turno[0]._id
        })
      })

      const success = await res.json()
      success.success && console.log(success)
      router.reload()
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    counter > 0 && setTimeout(()=> {setCounter(counter-1)}, 1000)
  }, [counter])

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
              <Button icon color="blue">
                <Icon name="edit"/>
              </Button>
              <Button icon color="red" onClick={handleDelet}>
                <Icon name="trash" />
              </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
      </motion.div>
  )
}

export default HomeWithTurno