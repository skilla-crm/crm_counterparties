import { useEffect, useState, useRef } from "react";
import Tooltip2 from "./Tooltip2/Tooltip2";
import s from "./EllipsisWithTooltip.module.scss";

const EllipsisWithTooltip = ({ text, className, textStyle, wrapperStyle }) => {
  const textRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = textRef.current;
      if (el) {
        setIsOverflowed(el.scrollWidth > el.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);
  if (!text || text.trim().length === 0) return null;

  return (
    <div
      className={`${s.root} ${className || ""}`}
      onMouseEnter={() => isOverflowed && setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      style={wrapperStyle}
    >
      <div ref={textRef} className={s.text} style={textStyle}>
        {text}
      </div>

      {isOverflowed && (
        <Tooltip2
          open={tooltipOpen}
          text={text}
          maxWidth={textRef.current?.offsetWidth}
          left={false}
          bottom={false}
          anchorRef={textRef}
        />
      )}
    </div>
  );
};

export default EllipsisWithTooltip;
