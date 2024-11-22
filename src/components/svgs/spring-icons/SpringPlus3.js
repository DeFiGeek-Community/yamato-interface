import * as React from 'react';

function SvgSpringPlus3(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.38 25.364v3.534L13.33 32.215l20.103 6.634-20.103 6.635 20.103 6.634-20.103 6.634 20.103 6.635L13.33 72.02l20.103 6.635L13.33 85.29l20.103 6.634L13.33 98.56l20.103 6.634-10.051 3.317v3.534M23.38 161.34v5.234l-10.051 4.913 20.103 9.828-20.103 9.827 20.103 9.827-20.103 9.828 20.103 9.827-20.103 9.827 20.103 9.828-20.103 9.827 20.103 9.828-20.103 9.827 20.103 9.827-10.051 4.914v5.234"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.914 0h-23v23h23V0zM34.914 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringPlus3;
