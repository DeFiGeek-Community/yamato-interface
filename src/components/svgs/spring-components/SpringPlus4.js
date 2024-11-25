import React from 'react';
import SpringPlus4 from '../spring-icons/SpringPlus4';

const CombinedPlus4 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus4 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '107px' }}>{children}</div>
    </div>
  );
};

export default CombinedPlus4;
