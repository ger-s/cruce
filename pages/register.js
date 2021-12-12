import { Button, Form } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";
import useInput from "../hooks/useInput";
import Notification from "../utils/Notification";
import { useEffect, useState } from "react";
//import useValidations from "../hooks/useValidations";

const Register = ({size, parse}) => {
  const router = useRouter();
  const [nameValidation, setNameValidation] = useState({status: true, error: ""});
  const [lastNameValidation, setLastNameValidation] = useState({status: true, error: ""});
  const [passwordValidation, setPasswordValidation] = useState({status: true, error: ""});
  const [dniValidation, setDniValidation] = useState({status: true, error: ""});
  const [phoneValidation, setPhoneValidation] = useState({status: true, error: ""});
  const [emailValidation, setEmailValidation] = useState({status: true, error: ""});

  const handleNameValidation = () => {
    if (!name.value.match("^[a-zA-ZáéíóúüñÁÉÍÓÚÑÜ]+$")) {
      return setNameValidation({status: false, error: "El nombre sólo acepta letras."});
    } else if (name.value.length > 30) {
      return setNameValidation({status: false, error: "El nombre debe tener menos de 30 caracteres."});
    } else {
      return setNameValidation({status: true, error: ""});
    }
  };

  const handlePasswordValidation = () => {
    if (password.value.length > 7 && password.value.length < 30) {
      return setPasswordValidation({status: true, error: ""});
    } else {
      return setPasswordValidation({status: false, error: "La contraseña sólo puede tener entre 8 y 30 caracteres."});
    }
  };

  const handleLastNameValidation = () => {
    if (!lastName.value.match("^[a-zA-ZáéíóúüñÁÉÍÓÚÑÜ]+$")) {
      return setLastNameValidation({status: false, error: "El apellido sólo acepta letras."});
    } else if (lastName.value.length > 30) {
      return setLastNameValidation({status: false, error: "El apellido debe tener menos de 30 caracteres."});
    } else {
      return setLastNameValidation({status: true, error: ""});
    }
  };

  const handleDniValidation = () => {
    if (!dni.value.match("^[0-9]+$")) {
      return setDniValidation({status: false, error: "El DNI debe tener sólo números."})
    } else if (dni.value.length < 7 || dni.value.length > 8) {
      return setDniValidation({status: false, error: "El DNI debe tener sólo entre 7 y 8 caracteres."});
    } else {
      return setDniValidation({status: true, error: ""});
    }
  };

  const handleEmailValidation = () => {
    if (email.value.match(/^\S+@\S+\.\S+$/)) {
      return setEmailValidation({status: true, error: ""});
    } else {
      return setEmailValidation({status: false, error: "Ingresá un email válido."});
    }
  };

  const handlePhoneValidation = () => {
    if (phone.value.match("^[0-9]*$")) {
      return setPhoneValidation({status: true, error: ""});
    } else {
      return setPhoneValidation({status: false, error: "Ingresá un teléfono válido."});
    }
  };

  const email = useInput("email");
  const password = useInput("password");
  const name = useInput("name");
  const lastName = useInput("lastName");
  const dni = useInput("DNI");
  const phone = useInput("phone");

  const handleSubmit = async (e) => {
    if (
      !nameValidation.status ||
      !lastNameValidation.status ||
      !passwordValidation.status ||
      !dniValidation.status ||
      !phoneValidation.status ||
      !emailValidation.status
    ) {
      Notification.errorMessage("Hay campos erroneos");
      return false;
    }
    e.preventDefault();
    try {
      // fetch es como axios, pero con particularidades
      const res = await fetch("/api/auth/register", {
        // se especifica el método
        method: "POST",
        // headers va por default
        headers: {
          "Content-Type": "application/json",
        },
        // es importante que al enviar algo, se haga el stringify
        body: JSON.stringify({
          name: name.value,
          lastName: lastName.value,
          password: password.value,
          dni: dni.value,
          email: email.value,
          phone: phone.value,
        }),
      });
      // para conseguir la data, no alcanza con desestructurar res
      // hay que convertirlo a json primero
      const { data, success, successMessage } = await res.json();

      if (success) {
        Notification.successMessage(successMessage);
        return router.push("/login");
      } else {
        Notification.errorMessage(successMessage);
      }
    } catch (error) {
      Notification.errorMessage(successMessage);
    }
  };

  useEffect(() => {
    parse.dni ? router.push('/') : null
  }, [parse])

  useEffect(() => {}, [name.value]);

  return (
    <Container>
      <Container textAlign="center" style={size.width / size.height > 0.7 ? { marginTop: "10%" } : { marginTop: "15%" }}>
        <h1 className="ui header"  style={{ marginBottom: "10%" }}>REGISTRO</h1>
        <br />
        <form className="ui form" onSubmit={handleSubmit}>
          <div
            onBlur={handleNameValidation}
            className={nameValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>Nombre</h3>
            </label>
            <input
              placeholder="María"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...name}
              required
            />
          {!nameValidation.status ? <label>{nameValidation.error}</label> : null}
          
          </div>
          <div
            onBlur={handleLastNameValidation}
            className={lastNameValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>Apellido</h3>
            </label>
            <input
              placeholder="Perez"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...lastName}
              required
            />
            {!lastNameValidation.status ? <label>{lastNameValidation.error}</label> : null}
            
          </div>
          <div
            onBlur={handleDniValidation}
            className={dniValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>DNI</h3>
            </label>
            <input
              placeholder="24811514"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...dni}
              required
            />
            {!dniValidation.status ? <label>{dniValidation.error}</label> : null}
          </div>
          <div
            onBlur={handleEmailValidation}
            className={emailValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>Email</h3>
            </label>
            <input
              placeholder="maria@gmail.com"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...email}
              required
            />
            {!emailValidation.status ? <label>{emailValidation.error}</label> : null}
          </div>
          <div
            onBlur={handlePhoneValidation}
            className={phoneValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>Teléfono</h3>
            </label>
            <input
              placeholder="1153211478"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...phone}
              required
            />
            {!phoneValidation.status ? <label>{phoneValidation.error}</label> : null}
          </div>
          <div
            onBlur={handlePasswordValidation}
            className={passwordValidation.status ? "field" : "field error"}
          >
            <label>
              <h3>Contraseña</h3>
            </label>
            <input
              type="password"
              placeholder="Contraseña de entre 8 y 30 caracteres"
              style={size.width / size.height > 0.7 ? { width: "55%" } : { width: "75%" }}
              {...password}
              required
            />
            {!passwordValidation.status ? <label>{passwordValidation.error}</label> : null}
          </div>
          <button
            style={{ margin: "5% 0%" }}
            className={`ui animated primary huge submit button ${
              !nameValidation.status ||
              !lastNameValidation.status ||
              !passwordValidation.status ||
              !dniValidation.status ||
              !phoneValidation.status ||
              !emailValidation.status
                ? `disabled`
                : null
            }`}
            type="submit"
            tabIndex="0"
          >
            <div className="visible content" > Registrarme </div>
            <div className="hidden content">
              <i className="right arrow icon"></i>
            </div>
          </button>
        </form>
        <p>
          ¿Ya tenés cuenta? <Link href="/login"> Iniciá sesión </Link>.
        </p>
      </Container>
    </Container>
  );
};

export default Register;
