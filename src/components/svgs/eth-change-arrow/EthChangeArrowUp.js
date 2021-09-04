import * as React from 'react';

function SvgEthChangeArrowUp(props) {
  return (
    <svg
      width={160}
      height={51}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#eth-change-arrow-up_svg__filter0_d)" fill="#FFE6E6">
        <path d="M66.015 25h56.855L50.432 50l15.583-25zM122.872 25H66.014L50.434 0l72.438 25z" />
      </g>
      <defs>
        <filter
          id="eth-change-arrow-up_svg__filter0_d"
          x={50.432}
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

export default SvgEthChangeArrowUp;
