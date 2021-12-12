import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "semantic-ui-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const TurnoSucursalSelector = ({size, sucursalSelection, step }) => {
  const router = useRouter()
  const [sucursales, setSucursales] = useState([]);

  const handleSelection = async (e) => {
    e.preventDefault();
    try {
      const str = sucursales.filter(sucursal => sucursal.text === e.target.textContent)
      sucursalSelection(str[0].value)
      return step('day')
    } catch(error) {
      console.log(error)
    }
  };

  useEffect(async () => {
    if (sucursales.length < 1) {
      try {
        const scs = await fetch("/api/admin/getAllSucursales", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
        });
        const success = await scs.json();
        if (success.success) {
          return success.data.map((sucursal, index) =>
            setSucursales((old) => [...old, { key: index, text: sucursal.name, value: sucursal._id}])
          );
        } else {
          success.successMessage === null ? router.push('/') : console.log(success)
        }
      } catch (err) {
        console.log(err);
      }
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
          <h1 style={{ marginBottom: "20%" }}>Elegí una sucursal:</h1>
          <Form>
            <Form.Input size="huge">
              <Dropdown
                placeholder="Sucursal..."
                search
                selection
                options={sucursales}
                onChange={handleSelection}
                //style={{ height: "70px" }}
              />
            </Form.Input>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default TurnoSucursalSelector;
