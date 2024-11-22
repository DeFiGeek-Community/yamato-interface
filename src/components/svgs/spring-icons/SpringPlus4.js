import * as React from 'react';

function SvgSpringPlus4(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.99 25.023v3.25l-10.052 3.052L33.04 37.43l-20.103 6.104 20.103 6.104-20.103 6.104 20.103 6.104-20.103 6.104 20.103 6.103-20.103 6.104L33.04 86.26l-20.103 6.104 20.103 6.104-10.052 3.052v3.251M22.99 154.28v5.522l-10.052 5.183 20.103 10.368-20.103 10.368 20.103 10.368-20.103 10.367 20.103 10.368-20.103 10.368 20.103 10.367-20.103 10.368 20.103 10.368-20.103 10.368L33.04 279.03l-10.052 5.184v5.522"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.522 0h-23v23h23V0zM34.522 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringPlus4;
