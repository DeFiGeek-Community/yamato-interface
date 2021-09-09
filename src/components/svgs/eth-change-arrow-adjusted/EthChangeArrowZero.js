import * as React from 'react';

function SvgEthChangeArrowZero(props) {
  return (
    <svg
      width={94}
      height={47}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#eth-change-arrow-zero_svg__filter0_d)">
        <path d="M46.5 0L93 23 46.5 46 0 23 46.5 0z" fill="#F9E6FF" />
      </g>
      <defs>
        <filter
          id="eth-change-arrow-zero_svg__filter0_d"
          x={0}
          y={0}
          width={94}
          height={47}
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

export default SvgEthChangeArrowZero;
