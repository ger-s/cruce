import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from "semantic-ui-react";
import NavbarParts from "./NavbarParts";

const Navbar = function ({ size }) {
  const [state, setState] = useState({ fixed: false, sidebarOpened: false });

  const hideFixedMenu = () => setState({ fixed: false });
  const showFixedMenu = () => setState({ fixed: true });
  const handleSidebarHide = () => setState({ sidebarOpened: false });
  const handleToggle = () => setState({ sidebarOpened: true });

  console.log(size)

  return (
    <>
      {(size.width/size.height) > 0.7 ? (
        <>
          <Visibility
            once={false}
            onBottomPassed={showFixedMenu}
            onBottomPassedReverse={hideFixedMenu}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ padding: "1em 0em" }}
              vertical
            >
              <Menu
                fixed={state.fixed ? "top" : null}
                inverted={!state.fixed}
                pointing={!state.fixed}
                secondary={!state.fixed}
                size="large"
              >
                <Container>
                  <Menu.Item as="a" active>
                    Home
                  </Menu.Item>
                  <Menu.Item as="a">Work</Menu.Item>
                  <Menu.Item as="a">Company</Menu.Item>
                  <Menu.Item as="a">Careers</Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted={!state.fixed}>
                      Log in
                    </Button>
                    <Button
                      as="a"
                      inverted={!state.fixed}
                      primary={state.fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
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
              inverted
              onHide={handleSidebarHide}
              vertical
              visible={state.sidebarOpened}
            >
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item as="a">Work</Menu.Item>
              <Menu.Item as="a">Company</Menu.Item>
              <Menu.Item as="a">Careers</Menu.Item>
              <Menu.Item as="a">Log in</Menu.Item>
              <Menu.Item as="a">Sign Up</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={state.sidebarOpened}>
              <Segment
                inverted
                textAlign="center"
                style={state.sidebarOpened ? ({ minHeight: 400, padding: "1em 0em" }) : ({padding: "1em 0em"})}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size="large">
                    <Menu.Item onClick={handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item position="right">
                      <Button as="a" inverted>
                        Log in
                      </Button>
                      <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                        Sign Up
                      </Button>
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
