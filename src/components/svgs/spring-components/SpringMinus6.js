import React from 'react';
import SpringMinus6 from '../spring-icons/SpringMinus6';

const CombinedMinus6 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus6 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '178px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus6;
