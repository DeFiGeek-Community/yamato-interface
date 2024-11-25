import React from 'react';
import SvgSpringMinus1 from '../spring-icons/SpringMinus1';

const CombinedMinus1 = ({ children, springcolor }) => {
  return (
    <div style={{ position: 'relative', width: '46px', height: '315px' }}>
      <SvgSpringMinus1 springcolor={springcolor} />
      <div style={{ position: 'absolute', top: '143px' }}>{children}</div>
    </div>
  );
};

export default CombinedMinus1;
