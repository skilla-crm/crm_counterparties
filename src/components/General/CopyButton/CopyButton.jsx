import { toast } from "react-toastify";
import CustomToast from "components/General/CustomToast/CustomToast";

// Icons
import { ReactComponent as IconCopy } from "assets/icons/iconCopy.svg";

// Styles
import s from "./CopyButton.module.scss";

const CopyButton = ({
  value,
  toastMessage = "Скопировано в буфер",
  className = "",
  onCopy,
}) => {
  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      if (onCopy) onCopy(value);

      toast(
        ({ closeToast }) => (
          <CustomToast message={toastMessage} closeToast={closeToast} />
        ),
        {
          className: s.toastWrapper,
          bodyClassName: s.toastBody,
          style: { background: "transparent", boxShadow: "none", padding: 0 },
          autoClose: 1000,
          closeButton: false,
        }
      );
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  return (
    <button
      type="button"
      className={`${s.iconButton} ${className}`}
      onClick={handleCopy}
      aria-label="Скопировать"
    >
      <IconCopy className={s.icon} />
    </button>
  );
};

export default CopyButton;
