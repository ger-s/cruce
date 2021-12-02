import { Button, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import bcryptjs from "bcryptjs";

const ForgetPassForm = async ({submit, currentStep, input1, input2}) => {
  const router = useRouter();

  return (
    <>
      {/* {currentStep ? (
        <Container textAlign="center" style={{ marginTop: "20%" }}>
          <Form onSubmit={submit}>
           {!input2 ? ( <Form.Field>
              <label>
                <h3>{currentStep}</h3>
              </label>
              <input placeholder={currentStep} style={{ width: "75%" }} {...input1} />
            </Form.Field>) : (
              <>
              <Form.Field>
              <label>
                <h3>Contraseña</h3>
              </label>
              <input type="password" style={{ width: "75%" }} {...input1} />
            </Form.Field>
            <Form.Field>
            <label>
              <h3>Reingresá la contraseña</h3>
            </label>
            <input type="password" style={{ width: "75%" }} {...input2} />
          </Form.Field>
          </>
            )}

            <Button type="submit">Enviar</Button>
          </Form>
        </Container>
      ) : null} */}
    </>
  );
};

export default ForgetPassForm;
