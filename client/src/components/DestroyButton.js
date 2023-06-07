import React from 'react';
import { Button } from 'react-bootstrap';

const destroyButton = (isShared, isAuth) => {
  if (!isAuth || !isShared) return null;

  return (
    <div className="d-flex justify-content-center align-items-end"
      style={{ flexDirection: 'column' }}>
      <Button style={{
        width: '150px',
        marginTop: isShared ? 352 : 388
      }}>Destroy</Button>
    </div>
  );
};

export default destroyButton;
