import React, { useEffect, useState } from "react";
import { Card, Container, Icon, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Notification from "../utils/Notification";
import { motion } from "framer-motion";

const TurnoCheckout = ({sucursalSelection, daySelection, hourSelection, size, step, user}) => {
  const router = useRouter();
  const [sucursal, setSucursal] = useState({});
  const [dateString, setDateString] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const str = e.target.textContent;
    if (str.slice(8) === "día") return step("day");
    if (str.slice(8) === "hora") return step("hour");
    if (str.slice(8) === "sucursal") return step("sucursal");
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/sucursal/turnos/createTurno/${user.dni}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          horaTurno: `${daySelection}T${Number(hourSelection.slice(0, 2)) + 3}:${hourSelection.slice(3)}:00`,
          sucursal: {
            name: sucursal.name,
            _id: sucursal._id,
          },
        }),
      });

      const success = await res.json();
      if (success.success) {
        Notification.successMessage(success.successMessage);
        return router.push("/");
      } else {
        Notification.errorMessage("Algo salió mal al confirmar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      setDateString(
        new Date(
          `${daySelection}T${hourSelection.slice(0, 2)}:${hourSelection.slice(
            3
          )}:00`
        ).toLocaleDateString("es-AR")
      );
      const res = await fetch(
        `/api/admin/getOneSucursal/${sucursalSelection}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const success = await res.json();
      if (success.success) {
        return setSucursal(success.data);
      } else {
        console.log("Algo salió mal");
      }
    } catch (error) {
      console.log(error);
    }
  }, [step]);

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
          <Card
            style={{
              boxShadow: "none",
              backgroundColor: "gainsboro",
              padding: "10%",
            }}
          >
            <Card.Content>
              <Card.Header>{`${sucursal.name}`}</Card.Header>
              {`Dirección: ${sucursal.address}`}
              <br />
              {`Teléfono: ${sucursal.phone}`}
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
              <Button
                animated
                color="teal"
                size="large"
                style={{ margin: "15px" }}
                onClick={handleConfirm}
              >
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
};

export default TurnoCheckout;
