import * as React from 'react';

function SvgThermometer(props) {
  return (
    <svg
      width={39}
      height={119}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#thermometer_svg__filter0_d)">
        <path
          d="M2.147 100.501c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15"
          fill="#868BFF"
        />
        <path
          d="M32 1H2v100h30V1z"
          fill="url(#thermometer_svg__paint0_linear)"
        />
        <path d="M32 1H2v22.439h30V1z" fill="#FCFAF2" />
        <path
          stroke="#CFCFCF"
          strokeWidth={3}
          strokeLinecap="round"
          d="M27.5 22.5h9"
        />
        <path
          d="M2 2v98.508C2 109.064 8.716 116 17 116c8.284 0 15-6.936 15-15.492V2"
          stroke="#CFCFCF"
          strokeWidth={3.78}
          strokeLinecap="round"
        />
        <path
          stroke="#CFCFCF"
          strokeWidth={3}
          strokeLinecap="round"
          d="M27.5 77.5h9"
        />
      </g>
      <defs>
        <linearGradient
          id="thermometer_svg__paint0_linear"
          x1={17}
          y1={1}
          x2={17}
          y2={101}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.39} stopColor="#FF8585" />
          <stop offset={0.683} stopColor="#E483FF" />
          <stop offset={0.761} stopColor="#838CFF" />
        </linearGradient>
        <filter
          id="thermometer_svg__filter0_d"
          x={0.11}
          y={0.11}
          width={38.89}
          height={118.78}
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

export default SvgThermometer;
