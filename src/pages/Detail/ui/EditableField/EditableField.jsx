import { useState } from "react";
import s from "./EditableField.module.scss";

import { ReactComponent as IconEdit } from "assets/icons/iconEdit.svg";
import { ReactComponent as IconDone } from "assets/icons/iconDoneBlue.svg";
import { set } from "lodash";
import UniButton from "components/General/UniButton/UniButton";
const EditableField = ({ initialValue = "", onSubmit, title }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSubmit?.(value);
    setEditing(false);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setEditing();
    }
  };
  return (
    <div>
      {editing ? (
        <div className={s.inputWrapper} onBlur={handleBlur}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <UniButton
            icon={IconDone}
            type="outline"
            style={{ height: "22px" }}
            onClick={handleSave}
            text="Отправить замечание"
          />
        </div>
      ) : (
        <div onClick={() => setEditing(true)} className={s.editableField}>
          <IconEdit />
          {title}
        </div>
      )}
    </div>
  );
};

export default EditableField;
