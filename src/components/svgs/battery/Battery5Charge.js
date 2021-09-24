import * as React from 'react';

function SvgBattery5Charge(props) {
  return (
    <svg
      width={62}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={60} height={32} rx={5} fill="#CFCFCF" />
      <rect x={52} y={9} width={10} height={13} rx={1} fill="#CFCFCF" />
      <rect x={5} y={5} width={50} height={22} rx={1} fill="#FCFAF2" />
      <rect x={5} y={5} width={20} height={22} rx={1} fill="#5BAD92" />
      <path
        d="M35 15.097l-4.907-.885L32.77 6 25 16.478l4.312.956L26.524 26 35 15.097z"
        fill="#FFE694"
      />
    </svg>
  );
}

export default SvgBattery5Charge;
