import React, { useState } from "react";

class useValidations {
  static name = (input) => {
    const [validation, setValidation] = useState(true);
    if (input) {
      input.length > 30 ? setValidation(false) : null;
      //input.matches("[a-zA-Z]+$") ? null : setValidation(false);
    }
  };
  static lastName = (input) => {
    const [validation, setValidation] = useState(true);
    if (input) {
      input.length > 30 ? setValidation(false) : null;
      //input.matches("[a-zA-Z]+$") ? null : setValidation(false);
    }
  };
}

export default useValidations;
