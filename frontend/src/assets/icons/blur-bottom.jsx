import PropTypes from "prop-types";

const BlurBottom = ({ className }) => (
  <svg
    className={className}
    width="288"
    height="226"
    viewBox="0 0 288 226"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.3" filter="url(#filter0_f_1091_2744)">
      <path
        d="M169.043 75.1051C221.09 127.152 242.176 190.45 216.14 216.485C190.104 242.521 83.2475 251.872 31.2011 199.826C-20.8453 147.78 70.8028 173.346 96.8386 147.31C122.874 121.274 116.997 23.0587 169.043 75.1051Z"
        fill="#F4A470"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_1091_2744"
        x="-44.5222"
        y="0.124023"
        width="331.819"
        height="297.377"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="30"
          result="effect1_foregroundBlur_1091_2744"
        />
      </filter>
    </defs>
  </svg>
);

export default BlurBottom;

BlurBottom.propTypes = {
  className: PropTypes.string,
};