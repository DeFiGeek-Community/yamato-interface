import React from 'react';
import Spring0 from '../spring-icons/Spring0';

const Combined0 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <Spring0 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '135px' }}>{children}</div>
    </div>
  );
};

export default Combined0;
