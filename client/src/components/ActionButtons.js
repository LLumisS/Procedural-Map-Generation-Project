import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButtons = (isAuth, item) => (
  <div className="mt-2" style={{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  }}>
    <Button style={{
      width: '200px',
      marginBottom: '5px'
    }} className="md-2">
      {item.isSaved && isAuth ? 'Delete' : 'Save'}
    </Button>
    <Button style={{
      width: '200px',
      backgroundColor: '#dbdbdb',
      color: 'black',
      borderColor: 'black'
    }}>Download</Button>
  </div>
);

export default ActionButtons;
