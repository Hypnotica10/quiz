// import { RefObject, useCallback, useEffect, useState } from "react";
// import { TooltipPositionEnum } from "../helper/constant";

// type UseTooltipProps = {
//   ref: RefObject<HTMLElement>;
//   tooltipRef: RefObject<HTMLDivElement>;
//   direction: TooltipPositionEnum;
// };

// type PositionMap<T> = {
//   [Key in keyof T]: {
//     position: Key;
//     cord: T[Key];
//   };
// };

// type Position = {
//   top?: number;
//   left?: number;
//   width?: number;
// };

// type TooltipSelfPosition = {
//   [TooltipPositionEnum.TOP]: Position;
//   [TooltipPositionEnum.LEFT]: Position;
//   [TooltipPositionEnum.RIGHT]: Position;
//   [TooltipPositionEnum.BOTTOM]: Position;
// };

// type TooltipPosition =
//   PositionMap<TooltipSelfPosition>[keyof PositionMap<TooltipSelfPosition>];

// export const useTooltip = ({ ref, tooltipRef, direction }: UseTooltipProps) => {
//   const [tooltipDirection, setTooltipDirection] =
//     useState<TooltipPositionEnum>(direction);
//   const [tooltipCord, setTooltipCord] = useState<TooltipPosition>({
//     position: tooltipDirection,
//     cord: {
//       top: 0,
//       left: 0,
//       width: 0,
//     },
//   });

//   const getCord = (
//     left: number,
//     width: number,
//     top: number,
//     height: number,
//     tooltipWidth: number,
//     tooltipHeight: number
//   ) => {
//     const offset = 12;
//     switch (tooltipDirection) {
//     //   case TooltipPositionEnum.TOP:
//     //     return {
//     //       ...tooltipCord,
//     //       cord: {
//     //         top: top + offset,
//     //         left: (width - tooltipWidth) / 2,
//     //         width,
//     //       },
//     //     };
//       case TooltipPositionEnum.BOTTOM:
//         return {
//           ...tooltipCord,
//           cord: {
//             top: top + offset,
//             left: 0,
//             width,
//           },
//         };
//     //   case TooltipPositionEnum.LEFT:
//     //     return {
//     //       ...tooltipCord,
//     //       cord: {
//     //         top: (height - tooltipHeight) / 2,
//     //         left: left + offset,
//     //         width,
//     //       },
//     //     };
//       case TooltipPositionEnum.RIGHT:
//         return {
//           ...tooltipCord,
//           cord: {
//             top: (height - tooltipHeight) / 2,
//             left: width + left,
//             width,
//           },
//         };
//       default:
//         return tooltipCord;
//     }
//   };

//   useEffect(() => {
//     if (!ref.current) {
//       return;
//     }

//     if (isVisible) {
//       const { left, width, top, height } = ref.current.getBoundingClientRect();
//       const tooltipWidth =
//         tooltipRef?.current?.getBoundingClientRect().width || 0;
//       const tooltipHeight =
//         tooltipRef?.current?.getBoundingClientRect().height || 0;
//       setTooltipCord(
//         getCord(left, width, top, height, tooltipWidth, tooltipHeight)
//       );
//     }

//     if (!isVisible) {
//       setTooltipCord({ position: tooltipDirection, cord: {} });
//     }
//   }, [isVisible, ref, tooltipRef]);

  

  

//   return {
//     tooltipCord,
//     isVisible,
//     onMouseEnter,
//     onMouseLeave,
//   };
// };
