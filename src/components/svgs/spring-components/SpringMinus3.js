import React from 'react';
import SpringMinus3 from '../spring-icons/SpringMinus3';

const CombinedMinus3 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus3 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '157px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus3;
