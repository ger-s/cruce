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
  Visibility
} from "semantic-ui-react";
import Notification from "../utils/Notification";
// import jwt from "jsonwebtoken";
// import jwt_decode from 'jwt-decode';
// const { jwtPass } = require("../secret.json");

const Navbar = function ({ size }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [me, setMe] = useState({});

  const parseJwt = (token) => {
    try {
      return JSON.parse(window.atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  console.log("ME", me);

  const [state, setState] = useState({ fixed: false, sidebarOpened: false });

  const hideFixedMenu = () => setState({ fixed: false });
  const showFixedMenu = () => setState({ fixed: true });
  const handleSidebarHide = () => setState({ sidebarOpened: false });
  const handleToggle = () => setState({ sidebarOpened: true });
  const handleLogout = () => {
    localStorage.removeItem("token"), router.push("/");
    return Notification.successMessage("Sesión cerrada con éxito.");
  };

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("token"));
    setUser(local);
    setMe(parseJwt(user));
  }, [router]);

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
                padding: "1em 0em"
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
                    <Link href="/">
                      <a>
                        <Image
                          pointing
                          src="/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </a>
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">Work</Menu.Item>
                  <Menu.Item as="a">Company</Menu.Item>
                  <Menu.Item as="a">Careers</Menu.Item>
                  <Menu.Item position="right">
                    {!user ? (
                      <>
                        <Link href="/login">
                          <Button as="a"> Iniciar sesión </Button>
                        </Link>
                        <Link href="/register">
                          <Button as="a" style={{ marginLeft: "0.5em" }}>
                            Registrate
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Button as="a" onClick={handleLogout}>
                        Cerrar sesión
                      </Button>
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

              {!user ? (
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
                <Menu.Item onClick={handleLogout}>
                  <p onClick={handleSidebarHide}>Cerrar sesión</p>
                </Menu.Item>
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
                        background: "white"
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
                      <Link href="/">
                        <Image
                          src="https://www.e-cruce.com/wp-content/uploads/2019/10/cruce.svg"
                          size="tiny"
                          //disabled
                        />
                      </Link>
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
