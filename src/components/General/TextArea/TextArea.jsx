import s from "./TextArea.module.scss";

const TextArea = ({ value, setValue, rows, ...props }) => {
  const handleTextValue = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <textarea
      className={s.area}
      value={value || ""}
      onChange={handleTextValue}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
