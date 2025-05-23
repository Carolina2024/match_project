import PropTypes from "prop-types";


const BlurTop = ({ className }) => (
  <svg
    className={className}
    width="208"
    height="247"
    viewBox="0 0 208 247"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.3" filter="url(#filter0_f_1091_2743)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.9852 10.0683C77.0338 0.763665 99.6221 -5.35101 106.535 6.70262C116.465 24.0172 89.4714 48.577 99.1048 66.0753C106.795 80.044 133.248 62.9049 143.885 74.5463C151.925 83.3461 146.931 100.938 139.604 110.401C131.668 120.65 109.808 112.616 104.967 124.81C97.379 143.924 127.633 177.596 109.604 185.967C91.253 194.487 86.4217 147.67 66.9852 142.444C53.9407 138.938 47.1659 164.867 33.7177 165.566C21.8596 166.182 4.74432 158.169 4.05187 145.716C3.0817 128.269 36.0757 118.154 30.1727 101.815C22.9475 81.8154 -13.9719 90.7516 -22.7742 71.4625C-28.6087 58.6769 -12.4372 39.991 0.862974 37.586C18.7663 34.3487 34.1145 65.1508 51.0043 58.1219C66.2096 51.794 54.7156 21.4295 66.9852 10.0683Z"
        fill="#F4A470"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_1091_2743"
        x="-84"
        y="-60"
        width="292"
        height="307"
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
          result="effect1_foregroundBlur_1091_2743"
        />
      </filter>
    </defs>
  </svg>
);

export default BlurTop;


BlurTop.propTypes = {
  className: PropTypes.string,
};