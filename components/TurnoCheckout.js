import React, { useEffect, useState } from "react";
import { Card, Container, Icon, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Notification from '../utils/Notification'
import { motion } from "framer-motion";

const TurnoCheckout = ({ sucursalSelection, daySelection, hourSelection, size, step, user}) => {
  const router = useRouter()
  const [sucursal, setSucursal] = useState({})
  const [dateString, setDateString] = useState('')

  console.log(user)

  const handleClick = (e) => {
    e.preventDefault()
    const str = e.target.textContent
    console.log(str.slice(8))
    if (str.slice(8) === 'día') return step('day')
    if (str.slice(8) === 'hora') return step('hour')
    if (str.slice(8) === 'sucursal') return step('sucursal')
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/sucursal/turnos/createTurno/${user.dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          horaTurno: `${daySelection}T${Number(hourSelection.slice(0,2))}:${hourSelection.slice(3)}:00`,
          sucursal: {
            name: sucursal.name,
            _id: sucursal._id,
          }
        })
      })

      const success = await res.json()
      if(success.success) {
        Notification.successMessage(success.successMessage)
        return router.push('/')
      } else {
        Notification.errorMessage('algo salio mal al confirmar')
      }
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(async () => {
    try {
      setDateString(new Date(`${daySelection}T${Number(hourSelection.slice(0,2))}:${hourSelection.slice(3)}:00`).toLocaleDateString('es-AR'))
      console.log(`${daySelection}T${Number(hourSelection.slice(0,2))}:${hourSelection.slice(3)}:00`)
      const res = await fetch(`/api/admin/getOneSucursal/${sucursalSelection}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const success = await res.json()
      if (success.success) {
        console.log(success.data)
        return setSucursal(success.data)
      } else {
        console.log('algo salio mal')
      }
    } catch(error) {
      console.log(error)
    }
  }, [step])

  return (
    <motion.div
          className="ui container fluid"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ stiffness: 150 }}
        >
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
              <Card.Header>{`Sucursal: ${sucursalSelection}`}</Card.Header>
              <div onClick={handleClick}>
                <a>Cambiar sucursal</a>
              </div>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Día: ${dateString}`}
                <div onClick={handleClick}>
                  <a>Cambiar día</a>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Hora: ${hourSelection}.`}
                <div onClick={handleClick}>
                  <a>Cambiar hora</a>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button animated color="teal" size='large' style={{margin: '15px'}} onClick={handleConfirm}>
                <Button.Content visible>Confirmar Turno</Button.Content>
                <Button.Content hidden>
                  <Icon name="check" />
                </Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default TurnoCheckout;