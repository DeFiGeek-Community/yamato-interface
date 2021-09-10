import * as React from 'react';

function SvgArrowYen(props) {
  return (
    <svg
      width={41.016}
      height={284}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="#cfcfcf"
        strokeWidth={3}
        strokeLinecap="round"
        d="M5.095 141.5h11"
      />
      <path
        stroke="#cfcfcf"
        strokeWidth={5}
        d="M11.168 17.011l-1.073 249.997"
      />
      <path
        d="M10.229.5a1 1 0 011.732 0l9.093 15.75a1 1 0 01-.866 1.5H2.001a1 1 0 01-.866-1.5zM10.96 283.5a1 1 0 01-1.731 0L.135 267.75a1 1 0 01.866-1.5h18.187a1 1 0 01.866 1.5z"
        fill="#cfcfcf"
      />
      <g>
        <path
          d="M21.768 145.5h6.804v-1.427h-2.4v-7.488h-1.296c-.66.444-1.44.552-2.556.744v1.104h2.088v5.64h-2.64zm14.808-4.967v-3.024h3v3.024zm-4.248-3.024h2.832v3.024h-2.832zm8.688-1.416H30.888v10.44h1.44v-4.584h7.248v2.904c0 .204-.084.276-.312.288-.24 0-1.02.012-1.704-.036.204.372.444 1.032.516 1.428 1.068 0 1.788-.024 2.268-.264.504-.228.672-.624.672-1.404z"
          fill="#818181"
        />
      </g>
    </svg>
  );
}

export default SvgArrowYen;
