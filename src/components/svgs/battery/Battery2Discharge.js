import * as React from 'react';

function SvgBattery2Discharge(props) {
  return (
    <svg
      width={98}
      height={49}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x={17} y={8} width={60} height={32} rx={5} fill="#CFCFCF" />
      <rect x={69} y={17} width={10} height={13} rx={1} fill="#CFCFCF" />
      <rect x={22} y={13} width={50} height={22} rx={1} fill="#FCFAF2" />
      <rect x={22} y={13} width={5} height={22} rx={1} fill="#5BAD92" />
      <path
        d="M87.997 38.995l.305-4.977 8.469 1.698-11.314-6.492-.445 4.395-8.834-1.768 11.819 7.144zM88.618 13.35l-3.28-3.755 7.218-4.744-12.61 3.334 2.77 3.439-7.525 4.95 13.427-3.224zM7.554 35.438l3.805 3.223-6.428 5.769 11.971-5.18-3.254-2.987 6.702-6.02-12.796 5.195zM11.499 6.505l-2.202 4.473L2.14 6.144l7.934 10.354 2.106-3.882 7.468 5.039-8.148-11.15z"
        fill="#FFE694"
      />
    </svg>
  );
}

export default SvgBattery2Discharge;
