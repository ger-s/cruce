import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Container,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import Notification from "../utils/Notification";
// import jwt from "jsonwebtoken";
// import jwt_decode from 'jwt-decode';
// const { jwtPass } = require("../secret.json");

const Navbar = ({ size, parse }) => {
 
  const router = useRouter();
  const [user, setUser] = useState({ dni: undefined });
  const [state, setState] = useState({ fixed: false, sidebarOpened: false });

  const hideFixedMenu = () => setState({ fixed: false });
  const showFixedMenu = () => setState({ fixed: true });
  const handleSidebarHide = () => setState({ sidebarOpened: false });
  const handleToggle = () => setState({ sidebarOpened: true });

  const handleLogout = () => {
    setUser({ dni: undefined })
    localStorage.removeItem("token")
    Notification.successMessage("Sesión cerrada con éxito.");
    setTimeout(() => router.reload(), 2000)
  };

  useEffect(() => {
    if (parse.dni === false) {
      if (router.pathname !== '/' && router.pathname !== '/login' && router.pathname !== '/register' && router.pathname !== '/passwordForget') {
        router.push('/')
      }
    }
  }, [parse]);
  return (
    <>
      {size.width / size.height > 0.7 ? (
        <>
          <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          >
            <Segment
              textAlign="center"
              style={{
                padding: "1em 0em",
              }}
              vertical
            >
              <Menu
                fixed={state.fixed ? "top" : null}
                secondary
                size="large"
                style={{ backgroundColor: "white" }}
              >


                <Container>
                  <Menu.Item position="left">
                  {( parse.role === "admin" || parse.role === "operator"?(

                    <Link href="/admin">
                      <a>
                        <Image
                          pointing
                          src="/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </a>
                    </Link>): (<Link href="/">
                      <a>
                        <Image
                          pointing
                          src="/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </a>
                    </Link>)  )}
                  </Menu.Item>
                  {/* <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">Work</Menu.Item>
                  <Menu.Item as="a">Company</Menu.Item>
                  <Menu.Item as="a">Careers</Menu.Item> */}
                  <Menu.Item position="right">
                    {!parse?.dni ? (
                      <>
                        <Link href="/login">
                          <Button as="a"> Iniciar sesión </Button>
                        </Link>
                        <Link href="/register">
                          <Button
                            as="a"
                            style={{ marginLeft: "0.5em" }}
                            secondary
                          >
                            Registrate
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                          {( parse.role === "admin" || parse.role === "operator"?
                            <>
                            <Link  href="/admin">
                        <h3 style={{ marginRight: "1em", marginTop: "0.6em" }}>
                          {parse.role}
                        </h3>
                        </Link>
                        <Button as="a" onClick={handleLogout} secondary>
                          Cerrar sesión
                        </Button>
                        </>
                      :    <>
                      <Link  href="/user">
                        
                      <h3 style={{ marginRight: "1em", marginTop: "0.6em" }}>
                        {parse.name}
                      </h3>
                      
                      </Link>
                      <Button as="a" onClick={handleLogout} secondary>
                        Cerrar sesión
                      </Button>
                      </>) }
                      </>
                      
                    )}
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </Visibility>
        </>
      ) : (
        <>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation="overlay"
              onHide={handleSidebarHide}
              vertical
              visible={state.sidebarOpened}
            >
              <Menu.Item as="a">Opciones</Menu.Item>

              {!parse?.dni ? (
                <>
                  <Link href="/login">
                    <Menu.Item onClick={handleSidebarHide}>
                      {" "}
                      Iniciar sesión{" "}
                    </Menu.Item>
                  </Link>

                  <Link href="/register">
                    <Menu.Item onClick={handleSidebarHide}>
                      Registrarme
                    </Menu.Item>
                  </Link>
                </>
              ) : (
                <div>
                {( parse.role === "admin" || parse.role === "operador" ?
                   <>
                  <Link  href="/admin">
                  <Menu.Item>
                    <h5>{parse.role}</h5>
                  </Menu.Item>
                  </Link>
                  <Menu.Item onClick={handleLogout}>
                    <p onClick={handleSidebarHide}>Cerrar sesión</p>
                  </Menu.Item>
                </>
                :  <>
                <Menu.Item>
                  <Link href="/user">
                  <h5>{parse.name}</h5>
                  </Link>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                  <p onClick={handleSidebarHide}>Cerrar sesión</p>
                </Menu.Item>
              </> )}
                </div>
                    )}
            </Sidebar>

            <Sidebar.Pusher dimmed={state.sidebarOpened}>
              <Segment
                // inverted
                textAlign="center"
                style={
                  state.sidebarOpened
                    ? {
                        minHeight: 125,
                        padding: "1em 0em",
                        background: "white",
                      }
                    : { padding: "1em 0em", background: "none" }
                }
                vertical
              >
                <Container>
                  <Menu
                    pointing
                    secondary
                    size="large"
                    style={{ border: "none" }}
                  >
                    <Menu.Item position="left">
                    {( parse.role === "admin" || parse.role === "operator"?(

                      <Link href="/admin">
                        <Image
                          src="https://www.e-cruce.com/wp-content/uploads/2019/10/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </Link>):( <Link href="/">
                        <Image
                          src="https://www.e-cruce.com/wp-content/uploads/2019/10/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </Link>)) }
                    </Menu.Item>

                    <Menu.Item position="right" onClick={handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </>
      )}
    </>
  );
};

export default Navbar;
