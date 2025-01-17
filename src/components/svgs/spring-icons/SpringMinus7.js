import * as React from 'react';

function SvgSpringMinus7(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.293 24.723v6.407l-10.051 6.016 20.103 12.03-20.103 12.032 20.103 12.03L13.242 85.27 33.345 97.3l-20.103 12.032 20.103 12.031-20.103 12.031 20.103 12.031-20.103 12.031 20.103 12.031-10.052 6.015v6.408"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M20.794 228.822v2.904l-17.197 3.877 20.103 4.531-20.103 4.533 20.103 4.532-20.103 4.531 20.103 4.534-20.103 4.531 20.101 4.531-20.101 4.534 20.101 4.533-20.101 4.531 20.103 4.533-2.906.655V292.236h5v-2.904l17.195-3.876-20.103-4.532 20.103-4.531-20.103-4.533 20.103-4.532-20.101-4.533 20.101-4.531-20.101-4.532 20.101-4.533-20.101-4.533 20.101-4.532-20.105-4.531 2.91-.656v-6.125h-5z"
        fill={props.springcolor}
      />
      <path
        d="M34.826 0h-23v23h23V0zM34.826 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringMinus7;