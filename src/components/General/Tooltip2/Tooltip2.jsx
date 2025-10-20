import classNames from "classnames";
import s from "./Tooltip2.module.scss";

import { createPortal } from "react-dom";

const Tooltip2 = ({ open, text, maxWidth, left, bottom, anchorRef }) => {
  if (!anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  /*   return createPortal( */
  return (
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        maxWidth: `${maxWidth}px`,
        zIndex: 9999,
      }}
      className={classNames(s.root, open && s.root_open)}
    >
      <p>{text}</p>
    </div>
  ); /* ,
    document.body
  ); */
};
export default Tooltip2;
