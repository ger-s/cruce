import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dropdown,
  Grid,
  Form,
  Container,
  Button,
} from "semantic-ui-react";
import useInput from "../../hooks/useInput";
import Notification from "../../utils/Notification";

const HomeAdmin = ({ parse }) => {
  const noSeUsa = "hola";
  const router = useRouter();
  const _id = useInput("ID");

  const [id, setId] = useState("");
  const [sucursalElegida, setSucursalElegida] = useState([]);
  const sucursal = useInput("Sucursal");
  const [sucursales, setSucursales] = useState([]);
  const [sucursalesId, setSucursalesId] = useState([]);
  const [waitSuccess, setWaitSuccess] = useState(false)

  useEffect(async () => {
    if (sucursales.length < 1) {
      try {
        const res = await fetch(`/api/admin/getAllSucursales`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
        });
        const success = await res.json();
        success.role === "admin" ? setWaitSuccess(true) : router.push('/')
        if (success.success) {
          success.data.map((sucursales, index) => {
            setSucursales((old) => [
              ...old,
              { key: sucursales._id, text: sucursales.name, value: index },
            ]);
          });
        }
      } catch (e) {
        return Notification.errorMessage("no tenés permisos admin");
      }
    }
  }, [noSeUsa]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/getOneSucursal/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const success = await res.json();

      if (success.success) {
        return router.push(`/admin/info/${success.data._id}`);
      } else {
        return Notification.errorMessage(success.successMessage);
      }
    } catch (e) {
      return Notification.errorMessage("Seleccioná una sucursal");
    }
  };

  const handleClick = (e, value) => {
    e.preventDefault();
    setSucursalElegida(e.target.textContent);

    value.options.filter((sucursal) => {
      if (sucursal.text === e.target.textContent) {
        setId(sucursal.key);
      }
    });
  };

  return (
    <div className="ui container fluid">
      {waitSuccess ? (<Grid>
        <Grid.Row>
          <Grid.Column >
          </Grid.Column>
          <Grid.Column width={13}>
            <h1
              style={{
                textAlign: "center",
                marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              Elegí una sucursal
            </h1>
            <Form onSubmit={handleSubmit}>
              <Dropdown
                clearable
                fluid
                style={{}}
                search
                selection
                options={sucursales}
                onChange={handleClick}
                placeholder="Seleccioná una sucursal"
              />
              <Container textAlign="center">
                <Button
                  primary
                  size="huge"
                  type="submit"
                  style={{ marginBottom: "10%", marginTop: "10%" }}
                >
                  Info sucursal
                </Button>

                <Link href="/admin/search/user">
                  <Button
                    primary
                    size="huge"
                    type="submit"
                    style={{ marginBottom: "10%", marginTop: "10%" }}
                  >
                    Editar usuario
                  </Button>
                </Link>
                <Link href="/admin/crear-sucursal">
                  <Button
                    primary
                    size="huge"
                    type="submit"
                    style={{ marginBottom: "10%", marginTop: "10%" }}
                  >
                    Crear sucursal
                  </Button>
                </Link>
              </Container>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>) : null}
    </div>
  );
};

export default HomeAdmin;
