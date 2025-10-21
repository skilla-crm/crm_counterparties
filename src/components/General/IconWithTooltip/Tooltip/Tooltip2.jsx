import classNames from "classnames";
import { createPortal } from "react-dom";
import s from "./Tooltip2.module.scss";

const Tooltip2 = ({ open, text, maxWidth, anchorRef }) => {
  if (!anchorRef?.current || !open) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        maxWidth: `${maxWidth}px`,
        zIndex: 9999,
      }}
      className={classNames(s.root, open && s.root_open)}
    >
      <p>{text}</p>
    </div>,
    document.body
  );
};

export default Tooltip2;
