import * as React from 'react';

function SvgSpringPlus2(props) {
  return (
    <svg
      width={46}
      height={315}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.772 24.956v3.84L12.72 32.4l20.104 7.209-20.104 7.209 20.104 7.209-20.104 7.208 20.104 7.21-20.104 7.208 20.104 7.209L12.72 90.07l20.104 7.209-20.104 7.208 20.104 7.209-10.052 3.605v3.839M22.772 168.26v4.952L12.72 177.86l20.104 9.298-20.104 9.298 20.104 9.298-20.104 9.297 20.104 9.298-20.104 9.298 20.104 9.297-20.104 9.298 20.104 9.298-20.104 9.297 20.104 9.298-10.052 4.649v4.952"
        stroke={props.springcolor}
        strokeWidth={5}
        strokeLinecap="square"
      />
      <path
        d="M34.305 0h-23v23h23V0zM34.305 292h-23v23h23v-23z"
        fill="#5BAD92"
      />
    </svg>
  );
}

export default SvgSpringPlus2;
