import React from 'react';
import SpringPlus6 from '../spring-icons/SpringPlus6';

const CombinedPlus6 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus6 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '93px' }}>{children}</div>
    </div>
  );
};

export default CombinedPlus6;
