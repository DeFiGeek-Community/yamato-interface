import * as React from 'react';

function SvgBattery3Charge(props) {
  return (
    <svg
      width={63}
      height={33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#battery3_charge_svg__filter0_d)">
        <rect width={60} height={32} rx={5} fill="#CFCFCF" />
        <rect x={52} y={9} width={10} height={13} rx={1} fill="#CFCFCF" />
        <rect x={5} y={5} width={50} height={22} rx={1} fill="#FCFAF2" />
        <rect x={5} y={5} width={10} height={22} rx={1} fill="#5BAD92" />
      </g>
      <path
        d="M35 15.097l-4.907-.885L32.77 6 25 16.478l4.312.956L26.524 26 35 15.097z"
        fill="#FFE694"
      />
      <defs>
        <filter
          id="battery3_charge_svg__filter0_d"
          x={0}
          y={0}
          width={63}
          height={33}
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

export default SvgBattery3Charge;
