import * as React from 'react';

function SvgThermometer(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="81.179"
      height="117.78"
      fill="none"
      version="1.1"
      viewBox="0 0 81.179 117.78"
      {...props}
    >
      <defs>
        <filter
          width="38.89"
          height="118.78"
          x="0.11"
          y="0.11"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="1" dy="1"></feOffset>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          ></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            mode="normal"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="17"
          x2="17"
          y1="1"
          y2="101"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.39" stopColor="#FF8585"></stop>
          <stop offset="0.683" stopColor="#E483FF"></stop>
          <stop offset="0.761" stopColor="#838CFF"></stop>
        </linearGradient>
        <filter
          width="38.89"
          height="118.78"
          x="8.11"
          y="21.11"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dx="1" dy="1"></feOffset>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          ></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            mode="normal"
            result="effect1_dropShadow"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow"
            mode="normal"
            result="shape"
          ></feBlend>
        </filter>
        <linearGradient
          x1="25"
          x2="25"
          y1="22"
          y2="122"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.392" stopColor="#FF9898"></stop>
          <stop offset="0.685" stopColor="#E483FF"></stop>
          <stop offset="0.763" stopColor="#838CFF"></stop>
        </linearGradient>
      </defs>
      <g fill="none" transform="translate(-.11 -.11)">
        <path
          fill="#868bff"
          d="M2.147 100.501c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15"
        ></path>
        <path fill="url(#paint0_linear)" d="M32 1H2v100h30z"></path>
        <path
          fill="#fcfaf2"
          strokeWidth="1"
          d={`M31.89.89h-30v${props.rate}h30z`}
        ></path>
        <path
          stroke="#cfcfcf"
          strokeLinecap="round"
          strokeWidth="3"
          d={`M27.39 ${props.rate}h9`}
        ></path>
        <path
          stroke="#cfcfcf"
          strokeLinecap="round"
          strokeWidth="3.78"
          d="M2 2v98.508C2 109.064 8.716 116 17 116c8.284 0 15-6.936 15-15.492V2"
        ></path>
        <path
          stroke="#cfcfcf"
          strokeLinecap="round"
          strokeWidth="3"
          d="M27.5 77.5L36.5 77.5"
        ></path>
        <g fill="none" transform="translate(-126.598 -182.775)">
          <path
            fill="#818181"
            d="M168.026 256.582l1.826 5.157 1.817-5.157h1.923v7.11h-1.47v-1.943l.147-3.355-1.919 5.298h-1.006l-1.914-5.293.147 3.35v1.943h-1.465v-7.11zm11.577 4.741c-.056.766-.339 1.368-.85 1.807-.508.44-1.178.66-2.011.66-.912 0-1.63-.306-2.154-.918-.52-.616-.781-1.46-.781-2.53v-.435c0-.683.12-1.285.361-1.806.241-.521.585-.92 1.03-1.197.45-.28.97-.42 1.563-.42.82 0 1.481.22 1.982.66.502.44.791 1.056.87 1.85h-1.465c-.036-.459-.165-.79-.386-.996-.218-.208-.552-.312-1-.312-.49 0-.855.175-1.1.527-.24.348-.364.89-.37 1.626v.537c0 .768.115 1.33.346 1.685.234.355.602.532 1.104.532.452 0 .789-.102 1.01-.307.225-.21.353-.53.386-.963zm2.744-.234h-1.167v2.603h-1.465v-7.11h2.641c.84 0 1.488.187 1.944.562.455.374.683.903.683 1.587 0 .485-.105.89-.317 1.215-.208.323-.526.58-.952.772l1.538 2.906v.068h-1.572zm-1.167-1.187h1.181c.368 0 .653-.092.855-.278.202-.189.302-.447.302-.776 0-.335-.096-.6-.288-.791-.188-.192-.48-.288-.874-.288h-1.176zm8.988 3.79h-1.411v-5.44l-1.685.523v-1.148l2.945-1.055h.151zm4.892 0h-1.41v-5.44l-1.685.523v-1.148l2.944-1.055h.151zm6.25-2.94c0 .984-.204 1.736-.61 2.256-.407.52-1.003.782-1.788.782-.774 0-1.367-.256-1.777-.767-.41-.511-.62-1.243-.63-2.198v-1.308c0-.993.205-1.747.615-2.261.414-.514 1.008-.771 1.783-.771.774 0 1.367.255 1.777.766.41.508.62 1.239.63 2.193zm-1.411-1.435c0-.59-.082-1.018-.244-1.285-.16-.27-.41-.405-.752-.405-.332 0-.578.129-.738.386-.156.254-.239.653-.249 1.196v1.729c0 .579.078 1.01.235 1.294.16.28.413.42.761.42.345 0 .594-.135.747-.405.153-.27.233-.684.24-1.241zm1.498-1.368c0-.436.142-.79.425-1.06.283-.273.654-.41 1.113-.41.466 0 .84.136 1.123.406.284.267.425.63.425 1.089v.351c0 .44-.141.793-.425 1.06-.283.267-.654.4-1.113.4-.462 0-.836-.133-1.123-.4-.283-.27-.425-.633-.425-1.089zm.938.376c0 .196.055.354.166.474a.592.592 0 00.444.176c.183 0 .327-.06.435-.181.107-.12.161-.281.161-.483v-.362a.684.684 0 00-.161-.473.565.565 0 00-.445-.181.563.563 0 00-.434.18c-.11.118-.166.282-.166.494zm2.46 3.624c0-.44.144-.793.43-1.06.287-.27.658-.405 1.114-.405.462 0 .835.133 1.118.4.286.264.43.628.43 1.094v.352c0 .436-.14.789-.42 1.059-.28.267-.653.4-1.118.4-.47 0-.845-.134-1.128-.405-.284-.27-.425-.628-.425-1.074zm.938.38c0 .18.059.333.176.46.117.127.264.19.44.19.397 0 .595-.22.595-.66v-.37a.656.656 0 00-.166-.47.568.568 0 00-.44-.18.568.568 0 00-.439.18c-.11.118-.166.279-.166.484zm-2.51.83l-.688-.37 3.472-5.557.688.37z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default SvgThermometer;
