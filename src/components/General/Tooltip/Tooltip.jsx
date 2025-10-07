import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import s from './Tooltip.module.scss';

const Tooltip = ({ text, maxWidth = 400, children }) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  const handleMouseEnter = () => {
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + window.scrollY + 8, //настройка оси Y  относительно родителя
      left: rect.left + rect.width / 2, //настройка оси X
    });
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const tooltip = open && (
    <div
      className={classNames(s.root, s.root_center, s.root_open)}
      style={{
        position: 'absolute',
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        transform: 'translate(-50%, 0)',
        maxWidth,
        zIndex: 9999,
      }}
    >
      <p>{text}</p>
    </div>
  );

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {ReactDOM.createPortal(tooltip, document.body)}
    </>
  );
};

export default Tooltip;
