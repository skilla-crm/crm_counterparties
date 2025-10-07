import React from 'react';

import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg'; // Замени на свой SVG-иконку

import s from './DownloadButton.module.scss';

const DownloadButton = ({ onClick, text = 'Скачать' }) => {
  return (
    <button className={s.button} onClick={onClick}>
      <IconDocument className={s.icon} />
      <span className={s.text}>{text}</span>
    </button>
  );
};

export default DownloadButton;
