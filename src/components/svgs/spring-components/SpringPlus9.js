import React from 'react';
import SpringPlus9 from '../spring-icons/SpringPlus9';

const CombinedPlus9 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus9 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '72px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus9;