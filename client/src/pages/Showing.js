import React, { useContext } from 'react';
import RatingStars from 'react-rating-stars-component';
import { Container, Button, Card, Image } from 'react-bootstrap';
import { MATRIX_LENGTH, PIXEL_SIZE } from '../generator/consts';
import { Context } from '..';
import { useLocation } from 'react-router-dom';
import { HOMEPAGE_ROUTE } from '../utils/consts';

const WIDTH = MATRIX_LENGTH * PIXEL_SIZE;
const HEIGHT = MATRIX_LENGTH * PIXEL_SIZE;

const filterStyle = {
  width: '150px',
  backgroundColor: '#dbdbdb',
  color: 'black',
  borderColor: 'black'
};

const Showing = () => {
  const { user, maps } = useContext(Context);

  const location = useLocation();
  const isSharedPage = location.pathname === HOMEPAGE_ROUTE;

  const data = isSharedPage ? maps.shares : maps.saves;

  return (
    <Container>
      <div className="mb-2" style={{ marginTop: '15px',
        display: 'flex', justifyContent: 'flex-end' }}>
        { isSharedPage ? <Button style={filterStyle}>Rating</Button> : <></>}
        <Button style={filterStyle} className="ml-2">Time</Button>
      </div>
      {data.map(item => (
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
              { isSharedPage ?
                <div
                  className="d-flex justify-content-between align-items-center">
                  <div>
                    <RatingStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      inactiveColor="#e4e4e4"
                      edit={user.isAuth}
                    />
                  </div>
                  <h6 style={{ marginTop: '8px' }}>{item.rating}</h6>
                </div> :
                <></>
              }
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
              { user.isAuth ?
                <div className="d-flex justify-content-center align-items-end"
                  style={{ flexDirection: 'column' }}>
                  <Button
                    style={{
                      width: '150px',
                      marginTop: isSharedPage ? 352 : 388
                    }}>Destroy</Button>
                </div> :
                <></>
              }
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Showing;
