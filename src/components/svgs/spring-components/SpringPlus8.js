import React from 'react';
import SpringPlus8 from '../spring-icons/SpringPlus8';

const CombinedPlus8 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus8 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '80px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus8;