import React from 'react';
import SpringPlus1 from '../spring-icons/SpringPlus1';

const CombinedPlus1 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus1 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '128px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus1;