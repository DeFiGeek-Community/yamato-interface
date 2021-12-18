import * as React from 'react';

function SvgThermometer(props) {
  return (
    <svg
      width={81.179}
      height={117.78}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id="thermometer_svg__a"
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
      </defs>
      <path
        d="M2.037 100.39c0 8.285 6.715 15 15 15 8.284 0 15-6.715 15-15"
        fill="#868bff"
      />
      <path
        d="M32 1H2v100h30z"
        fill="url(#thermometer_svg__a)"
        transform="translate(-.11 -.11)"
      />
      <path d="M31.89.755h-30v10h30z" fill="#fcfaf2" />
      <path
        stroke="#cfcfcf"
        strokeWidth={3}
        strokeLinecap="round"
        d="M27.39 10.759h9"
      />
      <path
        d="M1.89 1.89v98.508c0 8.556 6.715 15.492 15 15.492 8.284 0 15-6.936 15-15.492V1.89"
        stroke="#cfcfcf"
        strokeWidth={3.78}
        strokeLinecap="round"
      />
      <path
        stroke="#cfcfcf"
        strokeWidth={3}
        strokeLinecap="round"
        d="M27.39 74.385h9"
      />
      <text
        style={{
          lineHeight: 1.25,
          InkscapeFontSpecification: "'Helvetica Bold'",
        }}
        x={38.136}
        y={77.43}
        fontWeight={700}
        fontSize={8}
        fontFamily="Helvetica"
        letterSpacing={-0.65}
        wordSpacing={0}
        fill="#818181"
        transform="translate(-.11 -.11)"
      >
        <tspan
          x={38.136}
          y={77.43}
          style={{
            InkscapeFontSpecification: "'Roboto Bold'",
          }}
          dx={0}
          dy={0}
          rotate="0 0 0 0 0 0 0 0 0"
          fontFamily="Roboto"
        >
          {'MCR 130%'}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgThermometer;
