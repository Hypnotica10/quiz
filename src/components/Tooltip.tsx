import { useCallback, useEffect, useRef, useState } from "react";
import { TooltipPositionEnum } from "../helper/constant";
import { TooltipProps } from "../types/componentType";

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, elementRef, direction } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const onMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const getTooltipPosition = (direction: TooltipPositionEnum) => {
    switch (direction) {
      case TooltipPositionEnum.RIGHT: {
        return {
          top: "50%",
          left: `calc(${
            elementRef.current?.getBoundingClientRect().width
          }px + 8px)`,
          transform: "translateY(-50%)",
        };
      }
      case TooltipPositionEnum.BOTTOM:
        return {
          top: `calc(${
            elementRef.current?.getBoundingClientRect().height
          }px + 8px)`,
          left: "50%",
          transform: "translateX(-50%)",
        };

      default:
        return {
          top: `calc(${
            elementRef.current?.getBoundingClientRect().height
          }px + 8px)`,
          left: "50%",
          transform: "translateX(50%)",
        };
    }
  };

  useEffect(() => {
    const element = elementRef?.current;
    if (element) {
      element.addEventListener("mouseenter", onMouseEnter);
      element.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [elementRef, onMouseEnter, onMouseLeave]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={tooltipRef}
      className={`tooltip-container`}
      style={{ ...getTooltipPosition(direction) }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
