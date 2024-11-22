import * as React from 'react';

function SvgSpringPlus5(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.598 25.238V28.2l-10.051 2.782 20.103 5.564-20.103 5.565 20.103 5.564-20.103 5.564 20.103 5.564-20.103 5.564 20.103 5.564-20.103 5.564L32.65 81.06l-20.103 5.564 20.103 5.564-10.052 2.782v2.964M22.598 147.267v5.807l-10.051 5.453 20.103 10.904-20.103 10.905L32.65 191.24l-20.103 10.905 20.103 10.904-20.103 10.905 20.103 10.904-20.103 10.905 20.103 10.904-20.103 10.905 20.103 10.904-10.052 5.452v5.808"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.131 0h-23v23h23V0zM34.131 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringPlus5;
