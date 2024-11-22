import React from 'react';
import SpringMinus8 from '../spring-icons/SpringMinus8';

const CombinedMinus8 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus8 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '192px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedMinus8;