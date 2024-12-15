import React from "react";

const CompleteAnimation: React.FC = () => {
  
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="112"
        height="112"
        fill="none"
        viewBox="0 0 112 112"
      >
        <circle
          cx="56"
          cy="56"
          r="50"
          stroke="#FF983A"
          strokeDasharray="360"
          strokeDashoffset="360"
          strokeLinecap="round"
          strokeWidth="12"
          transform="rotate(-90)"
          transform-origin="center"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            calcMode="spline"
            dur="0.5s"
            keySplines="0.30, 0.00, 0.44, 1.00"
            repeatCount="1"
            values="360;0"
          ></animate>
        </circle>
        <circle
          cx="56"
          cy="56"
          r="50"
          stroke="#59E8B5"
          strokeDasharray="360"
          strokeDashoffset="360"
          strokeLinecap="round"
          strokeWidth="12"
          transform="rotate(-90)"
          transform-origin="center"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.2s"
            calcMode="spline"
            dur="0.5s"
            keySplines="0.30, 0.00, 0.44, 1.00"
            repeatCount="1"
            values="360;0"
          ></animate>
        </circle>
        <path
          fill="#59E8B5"
          fillRule="evenodd"
          d="M72.553 46.505c0-1.014-.394-1.99-1.1-2.718l-.021-.02a3.826 3.826 0 0 0-5.366 0L50.98 59.321l-4.307-4.424-.02-.02a3.825 3.825 0 0 0-5.366 0l-.02.021a3.9 3.9 0 0 0 .001 5.436l7.01 7.202a3.78 3.78 0 0 0 2.709 1.148 3.76 3.76 0 0 0 2.709-1.149l17.756-18.314a3.9 3.9 0 0 0 1.1-2.718"
          clipRule="evenodd"
        >
          <animate
            fill="freeze"
            attributeName="opacity"
            dur="1.7s"
            keyTimes="0; 0.25; 0.5; 0.6; 0.75; 0.9; 1"
            values="0; 0; 0.0; 0.2; 0.4; 0.8; 1"
          ></animate>
        </path>
      </svg>
    </div>
  );
};

export default CompleteAnimation;
