import React from 'react';
import SpringMinus9 from '../spring-icons/SpringMinus9';

const CombinedMinus9 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus9 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '199px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus9;
