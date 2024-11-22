import * as React from 'react';

function SvgSpringMinus2(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23.337 25.236V30.2l-10.052 4.66 20.104 9.321-20.104 9.321 20.104 9.321-20.104 9.321 20.104 9.32-20.104 9.322 20.104 9.321-20.104 9.32 20.104 9.321-20.104 9.321 20.104 9.321-10.052 4.66v4.965M23.337 196.07v3.818l-10.052 3.584 20.104 7.17-20.104 7.169 20.104 7.169-20.104 7.169 20.104 7.169-20.104 7.169 20.104 7.17-20.104 7.169 20.104 7.169-20.104 7.169 20.104 7.169-10.052 3.585v3.818"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path d="M34.87 0h-23v23h23V0zM34.87 292h-23v23h23v-23z" fill="#5BAD92" />
    </svg>
  );
}

export default SvgSpringMinus2;
