import * as React from 'react';

function SvgSpringMinus4(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.12 25.03v5.535L13.067 35.76 33.17 46.153 13.068 56.546 33.17 66.938 13.068 77.33 33.17 87.723 13.068 98.115l20.103 10.392L13.068 118.9l20.103 10.392-20.103 10.392 20.103 10.393-10.052 5.196v5.535M23.12 210.398v3.234l-10.052 3.036 20.103 6.073-20.103 6.072 20.103 6.073-20.103 6.072 20.103 6.073-20.103 6.072 20.103 6.073-20.103 6.072 20.103 6.073-20.103 6.072 20.103 6.073-10.052 3.036v3.234"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.652 0h-23v23h23V0zM34.652 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringMinus4;
