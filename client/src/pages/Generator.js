import React, { useState, useContext } from 'react';
import tableImage from '../table.png';
import { Button, ButtonGroup, Container, Card } from 'react-bootstrap';
import { create } from '../generator/start';
import { WIDTH, HEIGHT } from '../generator/consts';
import { Context } from '..';
import CanvasComponent from '../components/CanvasComponent';
import FiltersForm from '../components/FiltersForm';
import CreateButton from '../components/CreateButton';

create();

const buttonStyle = {
  width: '100px',
  backgroundColor: '#dbdbdb',
  color: 'black',
  borderColor: 'black'
};

const Generator = () => {
  const { user } = useContext(Context);
  const [selectedFilter, setSelectedFilter] = useState('Default');
  const [trigger, setTrigger] = useState(false);

  const handleApplyFilter = selectedFilter => {
    setSelectedFilter(selectedFilter);
  };

  const handleCreateMap = () => {
    create();
    setTrigger(prevTrigger => !prevTrigger);
  };

  return (
    <Container style={{ height: window.innerHeight - 54 }}>
      <Card className="p-3" style={{ marginTop: '20px' }}>
        <div>
          <h3
            className="d-flex justify-content-center"
          >Procedural Map Generation</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
            className="d-flex justify-content-center"
          >
            <div
              style={{
                flex: '0 0 400px',
                marginTop: '5px',
                border: '2px solid black'
              }}
            >
              <CanvasComponent
                selectedFilter={selectedFilter} trigger={trigger} />
            </div>
            <Card
              style={{
                width: 270,
                height: `${HEIGHT + 3}px`,
                marginLeft: '30px',
                marginTop: '5px',
                backgroundColor: '#f7f7f7'
              }}
              className="p-4">
              <h4 className="mb-3" style={{ textAlign: 'center' }}>
                Settings
              </h4>
              <h5 className="mb-2">Filters:</h5>
              <FiltersForm onApplyFilter={handleApplyFilter} />
              <CreateButton onCreate={handleCreateMap}/>
            </Card>
          </div>
          <div className="d-flex justify-content-center">
            <ButtonGroup
              style={{
                marginTop: '15px',
                width: `${WIDTH + 30 + 270}px`
              }}
            >
              <Button style={buttonStyle}>Download</Button>
              {user.isAuth ?
                <><Button style={buttonStyle}>Save</Button>
                  <Button style={buttonStyle}>Share</Button></> :
                <></>}
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
};

export default Generator;
