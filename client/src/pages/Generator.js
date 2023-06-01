import React from 'react';
import { useRef, useEffect } from 'react';
import tableImage from '../table.png';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const WIDTH = 400;
const HEIGHT = 400;

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'red';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
};

const Generator = () => (
  <Container
    style={{ height: window.innerHeight - 54 }}>
    <Card className="p-3" style={{ marginTop: '20px' }}>
      <div>
        <h3 className="d-flex justify-content-center">
        Procedural Map Generation</h3>
        <div style={{ display: 'flex',  flexDirection: 'row'  }}
          className="d-flex justify-content-center">
          <div style={{ flex: '0 0 400px',
            marginTop: '5px' }}>
            <CanvasComponent />
          </div>
          <Card style={{
            width: 270,
            height: HEIGHT,
            marginLeft: '30px',
            marginTop: '5px',
            backgroundColor: '#f7f7f7', }} className="p-4">
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
            <div className="d-flex justify-content-center">
              <Button className="mt-2"
                style={{ width: '135px',
                  backgroundColor: '#dbdbdb',
                  color: 'black',
                  borderColor: 'black' }}>Apply</Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button className="mt-5"
                style={{ width: '180px', height: '47px' }}>Create</Button>
            </div>
          </Card>
        </div>
      </div></Card>
    <div style={{ flex: '1' }}>
      <img
        src={tableImage}
        alt="Table"
        style={{
          marginTop: '10px',
          marginLeft: '10px',
          backgroundColor: 'floralwhite',
          width: '395px',
          height: '360px'
        }}
      />
    </div>
  </Container>
);

export default Generator;
