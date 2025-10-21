import { useRef, useState } from "react";
import Tooltip2 from "./Tooltip/Tooltip2";
import s from "./IconWithTooltip.module.scss";

const IconWithTooltip = ({ icon, text, tooltipText }) => {
  const [open, setOpen] = useState(false);
  const iconRef = useRef(null);

  return (
    <div className={s.edoElement}>
      <div
        ref={iconRef}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {icon}
      </div>
      <span>{text}</span>

      <Tooltip2
        open={open}
        text={tooltipText}
        maxWidth={200}
        anchorRef={iconRef}
      />
    </div>
  );
};

export default IconWithTooltip;
