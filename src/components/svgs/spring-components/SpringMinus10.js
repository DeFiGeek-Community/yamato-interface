import React from 'react';
import SpringMinus10 from '../spring-icons/SpringMinus10';

const CombinedMinus10 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus10 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '206px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus10;
