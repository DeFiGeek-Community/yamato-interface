import React from 'react';
import SpringPlus2 from '../spring-icons/SpringPlus2';

const CombinedPlus2 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus2 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '121px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedPlus2;