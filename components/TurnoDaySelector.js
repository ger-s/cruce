import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import { motion } from "framer-motion";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

const TurnoDaySelector = ({ daySelection, size, step }) => {
  const handleSelection = (e) => {
    e.preventDefault();
    const str = e.target.dataset.testid.slice(
      e.target.dataset.testid.indexOf("2")
    );
    console.log(str)
    daySelection(str);
    return step('hour')
  };

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
          <h1 style={{ marginBottom: "20%" }}>Elegí un día:</h1>
          <Form>
            <Form.Input size="big">
              <SemanticDatepicker
                locale={"es-ES"}
                format={"DD-MM-YYYY"}
                onChange={handleSelection}
              />
            </Form.Input>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default TurnoDaySelector;
