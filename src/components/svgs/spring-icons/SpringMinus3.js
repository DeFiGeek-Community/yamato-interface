import * as React from 'react';

function SvgSpringMinus3(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.728 25.134v5.245l-10.051 4.924L32.78 45.15 12.677 55l20.103 9.849-20.103 9.848 20.103 9.848-20.103 9.849 20.103 9.848-20.103 9.848 20.103 9.849-20.103 9.848 20.103 9.848-10.052 4.924v5.245M22.728 203.18v3.528l-10.051 3.313 20.103 6.625-20.103 6.625 20.103 6.625-20.103 6.624 20.103 6.625-20.103 6.625 20.103 6.625-20.103 6.625 20.103 6.625-20.103 6.625 20.103 6.625-10.052 3.313v3.528"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.261 0h-23v23h23V0zM34.261 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringMinus3;
