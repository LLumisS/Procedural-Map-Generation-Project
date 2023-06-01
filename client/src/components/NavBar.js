import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {
  GENERATOR_ROUTE,
  HOMEPAGE_ROUTE,
  SAVES_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE
} from '../utils/consts';

const NavBar = () => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href={GENERATOR_ROUTE}>GENERATOR</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={HOMEPAGE_ROUTE}>Homepage</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href={SAVES_ROUTE}>Saves</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button href={LOGIN_ROUTE}>Log In</Button>
          <Nav.Link href={REGISTRATION_ROUTE}>Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
