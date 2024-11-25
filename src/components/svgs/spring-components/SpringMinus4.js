import React from 'react';
import SpringMinus4 from '../spring-icons/SpringMinus4';

const CombinedMinus4 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus4 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '164px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus4;
