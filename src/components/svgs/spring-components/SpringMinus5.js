import React from 'react';
import SpringMinus5 from '../spring-icons/SpringMinus5';

const CombinedMinus5 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus5 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '171px' }}>
      {children}
      </div>
    </div>
  );
};

export default CombinedMinus5;