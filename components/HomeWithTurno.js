import React, { useEffect, useState } from "react";
import { Card, Container, Icon, Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import Notification from '../utils/Notification'

const HomeWithTurno = ({size}) => {
  return (
    <>
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
              <Card.Header>{`Sucursal:`}</Card.Header>
              <div>
                <a>Cambiar sucursal</a>
              </div>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Día: `}
                <div>
                  <a>Cambiar día</a>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                {`Hora:.`}
                <div >
                  <a>Cambiar hora</a>
                </div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button animated color="teal" size='large' style={{margin: '15px'}}>
                <Button.Content visible>Confirmar Turno</Button.Content>
                <Button.Content hidden>
                  <Icon name="check" />
                </Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </>
  )
}

export default HomeWithTurno