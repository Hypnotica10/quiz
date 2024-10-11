import { forwardRef } from "react";
import { OverlayProps } from "../types/componentType";

type OverlayRef = HTMLDivElement;

const Overlay = forwardRef<OverlayRef, OverlayProps>((props, overlayRef) => {
  const { children, handleOnClose, isOverlayActive } = props;
  return (
    <div
      ref={overlayRef}
      onClick={handleOnClose}
      className={`${
        isOverlayActive ? "animate-fadeInOverlay" : "animate-fadeOutOverlay"
      } top-0 left-0 right-0 bottom-0 z-50 fixed transition-all`}
    >
      {children}
    </div>
  );
});

export default Overlay;
