import React from "react";
import Confetti from "react-confetti";
import { ConfettiAnimationProps } from "../types/componentType";
const ConfettiAnimation: React.FC<ConfettiAnimationProps> = (props) => {
  const { width, height } = props;

  return (
    <Confetti
      confettiSource={{ x: 0, y: 0, w: width, h: height }}
      run={true}
      recycle={false}
      width={width}
      height={height}
      drawShape={(ctx) => {
        ctx.beginPath();
        for (let i = 0; i < 22; i++) {
          const angle = 0.35 * i;
          const x = (0.2 + 1.5 * angle) * Math.cos(angle);
          const y = (0.2 + 1.5 * angle) * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }}
    />
  );
};

export default ConfettiAnimation;
