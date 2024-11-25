import React from 'react';
import SpringPlus7 from '../spring-icons/SpringPlus7';

const CombinedPlus7 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus7 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '86px' }}>{children}</div>
    </div>
  );
};

export default CombinedPlus7;
