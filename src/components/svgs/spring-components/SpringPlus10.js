import React from 'react';
import SpringPlus10 from '../spring-icons/SpringPlus10';

const CombinedPlus10 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus10 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '65px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus10;