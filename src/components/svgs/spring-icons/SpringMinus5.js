import * as React from 'react';

function SvgSpringMinus5(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.51 24.927v5.838l-10.05 5.48 20.102 10.962L13.46 58.17l20.103 10.962L13.46 80.092l20.103 10.962-20.103 10.961 20.103 10.962-20.103 10.961L33.562 134.9 13.46 145.862l20.103 10.961-10.051 5.481v5.838M23.51 217.221v2.956l-10.05 2.776 20.102 5.55-20.103 5.55 20.103 5.55-20.103 5.55 20.103 5.551-20.103 5.55 20.103 5.55-20.103 5.55 20.103 5.55-20.103 5.551 20.103 5.55-10.051 2.775v2.956"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M35.044 0h-23v23h23V0zM35.044 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringMinus5;
