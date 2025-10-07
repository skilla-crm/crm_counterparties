import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import s from './SegmentButtons.module.scss';

const SegmentButtons = ({
  segments,
  value,
  callback,
  defaultIndex = 0,
  controlRef,
  style,
  counters,
  load,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const componentReady = useRef();

  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    const newIndex = segments.findIndex((s) => s.value === value);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [value, segments]);

  useEffect(() => {
    if (!controlRef?.current || !segments[activeIndex]?.ref?.current) return;

    const activeSegmentRef = segments[activeIndex].ref.current;
    const { offsetWidth, offsetLeft } = activeSegmentRef;
    const { style: cssStyle } = controlRef.current;

    cssStyle.setProperty('--highlight-width', `${offsetWidth}px`);
    cssStyle.setProperty('--highlight-x-pos', `${offsetLeft}px`);
  }, [activeIndex, controlRef, segments]);

  const onInputChange = (val, index) => {
    setActiveIndex(index);
    callback(val, index);
  };

  return (
    <div className={s.container} ref={controlRef}>
      <div
        className={classNames(
          s.controls,
          style === 2 && s.controls_2,
          componentReady.current ? s.controls_ready : s.controls_idle
        )}
      >
        {segments?.map((item, i) => (
          <div
            key={item.value}
            className={classNames(
              s.segment,
              style === 2 && s.segment_2,
              i === activeIndex && style === 2
                ? s.segment_active_2
                : i === activeIndex
                  ? s.segment_active
                  : s.segment_inactive,
              counters?.[item.value] === 0 && s.segment_disabled
            )}
            ref={item.ref}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
            <sup className={classNames(s.count, load && s.count_load)}>
              {counters?.[item.value] > 0 ? counters?.[item.value] : ''}
            </sup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SegmentButtons;
