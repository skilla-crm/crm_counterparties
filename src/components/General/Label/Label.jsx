import EllipsisWithTooltip from "../EllipsisWithTooltip/EllipsisWithTooltip";
import s from "./Label.module.scss";

const Label = ({ label, background, width }) => {
  if (!label) return null;
  return (
    <div
      className={s.label}
      style={{
        background: background || "#F1F4F9",
        width: width ? `${width}px` : "auto",
      }}
    >
      <EllipsisWithTooltip text={label} />
    </div>
  );
};

export default Label;
