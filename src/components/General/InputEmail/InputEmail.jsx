import s from "./InputEmail.module.scss";
import classNames from "classnames";
import { useState } from "react";

const emailValidate = (value) => {
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/g;
  if (value.match(isValidEmail)) {
    return true;
  } else {
    return false;
  }
};

const InputEmail = ({
  email,
  setEmail,
  disabled,
  placeholder,
  width,
  setValidate,
  errorRequired,
  setErrorRequired,
  required = true,
}) => {
  const [errorValidate, setErrorValidate] = useState(false);

  // const handleEmail = (e) => {
  //     const value = e.currentTarget.value;
  //     setEmail(value);

  //     if (value.length === 0) {
  //         setValidate(false);
  //         return;
  //     }
  //     if (value.length > 0 && !emailValidate(value)) {
  //         setValidate(false);
  //     } else {
  //         setValidate(true);
  //     }
  // };

  const handleEmail = (e) => {
    const value = e.currentTarget.value;
    setEmail(value);

    if (value.length === 0) {
      setValidate(!required);
      return;
    }

    if (!emailValidate(value)) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  };

  const handleBlur = () => {
    if (email.length > 0 && !emailValidate(email)) {
      setErrorValidate(true);
    }
  };

  const handleFocus = () => {
    setErrorValidate(false);
    setErrorRequired && setErrorRequired(false);
  };
  return (
    <div className={s.root}>
      <input
        style={{ width: width ? `${width}px` : "100%" }}
        disabled={disabled}
        className={classNames(
          s.input,
          (errorValidate || errorRequired) && s.input_error
        )}
        onChange={handleEmail}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={email || ""}
        placeholder={placeholder}
        autocomplete="off"
      ></input>

      <div
        className={classNames(
          s.error,
          (errorValidate || errorRequired) && s.error_vis
        )}
      >
        {errorValidate && <p>Неверный формат эл. адреса</p>}
        {errorRequired && <p>Заполни эл. почту</p>}
      </div>
    </div>
  );
};

export default InputEmail;
