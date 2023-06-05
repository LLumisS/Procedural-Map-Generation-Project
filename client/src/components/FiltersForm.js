import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const FiltersForm = ({ onApplyFilter }) => {
  const filters = ['Default', 'Physical', 'Moisture', 'Temperature'];
  const [selectedFilter, setSelectedFilter] = useState('Default');

  const handleFilterChange = event => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    onApplyFilter(selectedFilter);
  }, [selectedFilter, onApplyFilter]);

  return (
    <div>
      <Form style={{ marginLeft: '10px' }}>
        {filters.map(name => (
          <div key={`${name}-radio`} className="mb-2">
            <Form.Check
              type="radio"
              name="group1"
              id={`${name}-radio`}
              label={name}
              value={name}
              checked={selectedFilter === name}
              onChange={handleFilterChange}
            />
          </div>
        ))}
      </Form>
    </div>
  );
};

export default FiltersForm;
