import React from 'react';
import SpringMinus2 from '../spring-icons/SpringMinus2';

const CombinedMinus2 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus2 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '150px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus2;
