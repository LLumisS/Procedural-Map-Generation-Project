import React, { useContext } from 'react';
import { Container, Button, Card, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Context } from '..';
import { HOMEPAGE_ROUTE } from '../utils/consts';
import { WIDTH, HEIGHT } from '../generator/consts';
import ratingStars from '../components/RatingStars';
import actionButtons from '../components/ActionButtons';
import destroyButton from '../components/DestroyButton';

const filterStyle = {
  width: '150px',
  backgroundColor: '#dbdbdb',
  color: 'black',
  borderColor: 'black'
};

const Showing = () => {
  const { user, maps } = useContext(Context);
  const location = useLocation();
  const isShared = location.pathname === HOMEPAGE_ROUTE;

  const data = isShared ? maps.shares : maps.saves;

  return (
    <Container>
      <div className="mb-2" style={{
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        {isShared && <Button style={filterStyle}>Rating</Button>}
        <Button style={filterStyle} className="ml-2">Time</Button>
      </div>
      {data.map(item => (
        <Card key={item.id} style={{
          marginTop: '10px',
          backgroundColor: '#f7f7f7',
          height: '100%'
        }} className="p-3">
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '7' }}>
              <Image src={`/static/${item.matrix}`}
                alt="img" width={WIDTH} height={HEIGHT} />
            </div>
            <div>
              {ratingStars(item, isShared, user.isAuth)}
              {actionButtons()}
              {destroyButton(isShared, user.isAuth)}
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Showing;
