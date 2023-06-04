import React from 'react';
import { useRef, useEffect } from 'react';
import tableImage from '../table.png';
import { Button, ButtonGroup, Form, Container, Card } from 'react-bootstrap';
import { create, MAP } from '../generator/start';
import { MATRIX_LENGTH, PIXEL_SIZE } from '../generator/consts';

const WIDTH = MATRIX_LENGTH * PIXEL_SIZE;
const HEIGHT = MATRIX_LENGTH * PIXEL_SIZE;

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  create();

  useEffect(() => {
    const canvas = canvasRef.current;
    MAP['Default'].draw(canvas);
  }, []);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}
    style={{ display: 'block', boxSizing: 'border-box' }} />;
};

const buttonStyle = {
  width: '100px',
  backgroundColor: '#dbdbdb',
  color: 'black',
  borderColor: 'black'
};

const FiltersForm = () => {
  const filters = ['Default', 'Physical', 'Moisture', 'Temperature'];

  return (
    <Form style={{ marginLeft: '10px' }}>
      {filters.map(name => (
        <div key={`${name}-radio`} className="mb-2">
          <Form.Check
            type='radio'
            name='group1'
            id={`${name}-radio`}
            label={`${name}`}
            defaultChecked={name === 'Default'}
          />
        </div>
      ))}
    </Form>
  );
};

const MapActions = () => (
  <div className="d-flex justify-content-center">
    <Button className="mt-2"
      style={{
        width: '135px',
        backgroundColor: '#dbdbdb',
        color: 'black',
        borderColor: 'black'
      }}>Apply</Button>
  </div>
);

const CreateButton = () => (
  <div className="d-flex justify-content-center align-items-end"
    style={{ height: '100%' }}>
    <Button className="mt-5" style={{ width: '180px', height: '47px' }}>
      Create
    </Button>
  </div>
);

const Generator = () => (
  <Container style={{ height: window.innerHeight - 54 }}>
    <Card className="p-3" style={{ marginTop: '20px' }}>
      <div>
        <h3 className="d-flex justify-content-center"
        >Procedural Map Generation</h3>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }} className="d-flex justify-content-center">
          <div style={{
            flex: '0 0 400px',
            marginTop: '5px',
            border: '2px solid black'
          }}><CanvasComponent />
          </div>
          <Card style={{
            width: 270,
            height: `${HEIGHT + 3}px`,
            marginLeft: '30px',
            marginTop: '5px',
            backgroundColor: '#f7f7f7'
          }} className="p-4">
            <h4 className="mb-3" style={{ textAlign: 'center' }}>Settings</h4>
            <h5 className="mb-2">Filters:</h5>
            <FiltersForm />
            <MapActions />
            <CreateButton />
          </Card>
        </div>
        <div className="d-flex justify-content-center">
          <ButtonGroup style={{
            marginTop: '15px',
            width: `${WIDTH + 30 + 270}px`
          }}>
            <Button style={buttonStyle}>Download</Button>
            <Button style={buttonStyle}>Save</Button>
            <Button style={buttonStyle}>Share</Button>
          </ButtonGroup>
        </div>
      </div>
    </Card>
    <div style={{ flex: '1' }} className="d-flex justify-content-center">
      <img
        src={tableImage}
        alt="Table"
        style={{
          marginTop: '10px',
          marginLeft: '10px',
          width: '395px',
          height: '360px'
        }}
      />
    </div>
  </Container>
);

export default Generator;
