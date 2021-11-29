import Link from "next/link";
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

const NavbarParts = ({size}) => {
    console.log(size)
  return (
    <Container text>
      <Header
        as="h1"
        content="Imagine-a-Company"
        inverted
        style={{
          fontSize: size.width < 500 ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: size.width < 500 ? "1.5em" : "3em",
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        inverted
        style={{
          fontSize: size.width < 500 ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: size.width < 500 ? "0.5em" : "1.5em",
        }}
      />
      <Button primary size="huge">
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Container>
  );
};

export default NavbarParts;
