import React from 'react';
import SpringMinus7 from '../spring-icons/SpringMinus7';

const CombinedMinus7 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SpringMinus7 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '185px' }}>
        {children}
      </div>
    </div>
  );
};

export default CombinedMinus7;