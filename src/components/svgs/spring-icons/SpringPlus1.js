import * as React from 'react';

function SvgSpringPlus1(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.163 25.383v4.104L13.112 33.34l20.103 7.706-20.103 7.707 20.103 7.706-20.103 7.706 20.103 7.706-20.103 7.706 20.103 7.706-20.103 7.706 20.103 7.707-20.103 7.706 20.103 7.706-10.052 3.853v4.104M23.163 175.107v4.672l-10.051 4.387 20.103 8.774-20.103 8.773 20.103 8.774-20.103 8.774 20.103 8.773-20.103 8.774 20.103 8.774-20.103 8.773 20.103 8.774-20.103 8.774 20.103 8.773-10.052 4.387v4.673"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.696 0h-23v23h23V0zM34.696 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringPlus1;
