import React from 'react';
import classNames from 'classnames';

import s from './CustomInput.module.scss';

const CustomInput = ({
  label = '',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  error = '',
  name = '',
  type = 'text',
}) => {
  return (
    <div className={classNames(s.inputWrapper, error && s.errorWrapper)}>
      {label && (
        <label className={classNames(s.label, error && error && s.errorWrapper)}>{label}</label>
      )}
      <input
        className={classNames(s.input, disabled && s.disabled)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  );
};

export default CustomInput;
