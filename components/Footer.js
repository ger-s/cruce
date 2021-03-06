import React from "react";
// import Image from "next/image";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";

function Footer({size}) {
  return (

    /* 
    para hacer el footer responsive dejo
    la siguiente linea para corroborar
    si es mobile (true), o desktop (false)

    { size.width / size.height < 0.7 ? }

    probablemente haya que hacer 2 footer distintos
    o no, ya veremos cómo jugar
    */
   
    <footer
      style={{
        margin: "5em 0em 0em 0em",
        width: "100vw",
        padding: "0em",
        background: "lightgray",
        // position: "absolute",
        // bottom: "0"
      }}
    >
      <Segment
        // inverted
        vertical
        style={{
          margin: "5em 0em 0em",
          padding: "5em 0em",
        }}
      >
        <Container textAlign="center">
          <Grid
            divided
            // inverted
            stackable
          >
            <Grid.Column width={3}>
              <Header
                //  inverted
                as="h4"
                content="Información de interés"
              />
              <List
                link
                // inverted
              >
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
               
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header
                //  inverted
                as="h4"
                content="Legales"
              />
              <List
                link
                // inverted
              >
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
              
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header
                // inverted
                as="h4"
                content="Contacto"
              />
              <List
                link
                // inverted
              >
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
             
             
              <Image
                centered
                size="small"
                src="/cruce.svg"
                style={{ color: "red" }}
              />
            </Grid.Column>
          </Grid>

          {/* <Divider inverted section /> */}
          {/* <Image centered size="small" src="/cruce.svg" />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List> */}
        </Container>
      </Segment>
    </footer>
  );
}

export default Footer;
