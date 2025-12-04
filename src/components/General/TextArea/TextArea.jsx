import s from "./TextArea.module.scss";

const TextArea = ({ value, setValue, rows, width, ...props }) => {
  const handleTextValue = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <textarea
    style={{width: width ? `${width}px` : '', textWrap: width ? 'nowrap' : '', overflow: 'hidden'}}
      className={s.area}
      value={value || ""}
      onChange={handleTextValue}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
