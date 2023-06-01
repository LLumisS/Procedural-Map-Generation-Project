import React from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 400 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Log In' : 'Registration'}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            placeholder="Login"/>
          <Form.Control
            className="mt-3"
            placeholder="Password"/>
          {isLogin ?
            <></> :
            <Form.Control
              className="mt-3"
              placeholder="Confirm Password"/>
          }
          <div className="d-flex justify-content-center">
            <Button className="mt-4" style={{ width: '200px' }}>Confirm</Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
