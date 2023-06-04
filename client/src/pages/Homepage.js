import React, { useContext } from 'react';
import RatingStars from 'react-rating-stars-component';
import { Container, Button, Card, Image } from 'react-bootstrap';
import { MATRIX_LENGTH, PIXEL_SIZE } from '../generator/consts';
import { Context } from '..';

const WIDTH = MATRIX_LENGTH * PIXEL_SIZE;
const HEIGHT = MATRIX_LENGTH * PIXEL_SIZE;

const filterStyle = {
  width: '150px',
  backgroundColor: '#dbdbdb',
  color: 'black',
  borderColor: 'black'
};

const Homepage = () => {
  const { maps } = useContext(Context);

  return (
    <Container>
      <div className="mb-2" style={{ marginTop: '15px',
        display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={filterStyle}>Rating</Button>
        <Button style={filterStyle} className="ml-2">Time</Button>
      </div>
      {maps.shares.map(item => (
        <Card
          style={{
            marginTop: '10px',
            backgroundColor: '#f7f7f7',
            height: '100%'
          }} className="p-3">
          <div key={item.id} style={{ display: 'flex' }}>
            <div style={{ flex: '7' }}>
              <Image src={`/static/${item.matrix}`} alt="img" width={WIDTH}
                height={HEIGHT} />
            </div>
            <div>
              <div
                className="d-flex justify-content-between align-items-center">
                <div>
                  <RatingStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    inactiveColor="#e4e4e4"
                    edit={true}
                  />
                </div>
                <h6 style={{ marginTop: '8px' }}>{item.rating}</h6>
              </div>
              <div className="mt-2"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column' }}>
                <Button style={{ width: '200px', marginBottom: '5px' }}
                  className="md-2">Save</Button>
                <Button
                  style={{
                    width: '200px',
                    backgroundColor: '#dbdbdb',
                    color: 'black',
                    borderColor: 'black'
                  }}>Download</Button>
              </div>
              <div className="d-flex justify-content-center align-items-end"
                style={{ flexDirection: 'column' }}>
                <Button
                  style={{
                    width: '150px',
                    marginTop: 348
                  }}>Destroy</Button></div>
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Homepage;
