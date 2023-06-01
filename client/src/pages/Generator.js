import React from 'react';
import { useRef, useEffect } from 'react';
import tableImage from '../table.png';
import { ButtonGroup, Button, Form, Container, Card } from 'react-bootstrap';

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

const Generator = () => (
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: window.innerHeight - 54 }}>
    <Card style={{ width: 270 }} className="p-4">
      <h4 className="mb-3" style={{ textAlign: 'center' }}>Settings</h4>
      <h5 className="mb-2">Filters:</h5>
      <Form style={{ marginLeft: '10px' }}>
        {['Default', 'Physical', 'Moisture', 'Temperature'].map(name =>
          (
            <div key={`${name}-radio`} className="mb-2">
              <Form.Check
                type='radio'
                name='group1'
                id={`${name}-radio`}
                label={`${name}`}
                defaultChecked={name === 'Default'}
              />
            </div>
          )
        )}
      </Form>
    </Card>
  </Container>
);

export default Generator;
