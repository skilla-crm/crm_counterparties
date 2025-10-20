import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";
import s from "./Label.module.scss";

const Label = ({ label }) => {
  if (!label) return null;
  <div className={s.label}>
    <EllipsisWithTooltip text={label} />
  </div>;
};

export default Label;
