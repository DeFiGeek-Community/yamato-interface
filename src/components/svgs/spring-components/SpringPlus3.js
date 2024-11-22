import React from 'react';
import SpringPlus3 from '../spring-icons/SpringPlus3';

const CombinedPlus3 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus3 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '114px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus3;