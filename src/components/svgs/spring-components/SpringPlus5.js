import React from 'react';
import SpringPlus5 from '../spring-icons/SpringPlus5';

const CombinedPlus5 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringPlus5 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '100px' }}>{children}</div>
    </div>
  );
};

export default CombinedPlus5;
