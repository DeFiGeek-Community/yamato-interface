import * as React from 'react';

function SvgSpringMinus1(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.946 25.34v4.668l-10.052 4.381 20.103 8.763-20.103 8.763 20.103 8.763-20.103 8.763 20.103 8.763-20.103 8.763 20.103 8.763-20.103 8.763 20.103 8.763-20.103 8.763 20.103 8.762-10.051 4.382v4.667M22.946 189.352v4.092l-10.052 3.842 20.103 7.683-20.103 7.684 20.103 7.683-20.103 7.683 20.103 7.683-20.103 7.684 20.103 7.683-20.103 7.683 20.103 7.684-20.103 7.683 20.103 7.683-10.051 3.842v4.092"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.479 0h-23v23h23V0zM34.479 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringMinus1;
