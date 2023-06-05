import React from 'react';
import { Button } from 'react-bootstrap';

const CreateButton = ({ onCreate }) => (
  <div className="d-flex justify-content-center align-items-end"
    style={{ height: '100%' }}>
    <Button className="mt-5" style={{ width: '180px', height: '47px' }}
      onClick={onCreate}>
        Create
    </Button>
  </div>
);

export default CreateButton;
