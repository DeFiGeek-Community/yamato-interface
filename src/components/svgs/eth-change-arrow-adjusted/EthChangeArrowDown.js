import * as React from 'react';

function SvgEthChangeArrowDown(props) {
  return (
    <svg
      width={160}
      height={51}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#eth-change-arrow-down_svg__filter0_d)" fill={props.color}>
        <path d="M93.076 25H36.22l72.438-25-15.583 25zM36.219 25h56.857l15.581 25-72.438-25z" />
      </g>
      <defs>
        <filter
          id="eth-change-arrow-down_svg__filter0_d"
          x={36.219}
          y={0}
          width={73.44}
          height={51}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={1} dy={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgEthChangeArrowDown;
