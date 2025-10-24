// External
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

// Styles
import s from './TabsButtons.module.scss';

const TabsButtons = ({
    segments = [],
    value,
    callback,
    defaultIndex = 0,
    controlRef,
}) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    useEffect(() => {
        const index = segments.findIndex((segment) => segment.value === value);
        if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index);
        }
    }, [value, segments, activeIndex]);

    useEffect(() => {
        const activeRef = segments[activeIndex]?.ref?.current;
        const container = controlRef?.current;
        if (!activeRef || !container) return;

        const { offsetWidth, offsetLeft } = activeRef;
        const style = container.style;
        style.setProperty('--highlight-width', `${offsetWidth}px`);
        style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
    }, [activeIndex, controlRef, segments]);

    const handleSelect = (val, index) => {
        setActiveIndex(index);
        callback?.(val, index);
    };

    return (
        <div className={s.container} ref={controlRef}>
            <div
                className={classNames(
                    s.controls,
                    isMounted.current ? s.controls_ready : s.controls_idle
                )}
            >
                {segments.map((item, index) => (
                    <div
                        key={item.value}
                        ref={item.ref}
                        className={classNames(
                            s.segment,
                            s.segmentRow,
                            index === activeIndex
                                ? s.segment_active
                                : s.segment_inactive
                        )}
                    >
                        <input
                            type="radio"
                            id={item.label}
                            value={item.value}
                            checked={index === activeIndex}
                            onChange={() => handleSelect(item.value, index)}
                        />
                        <label htmlFor={item.label}>{item.label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabsButtons;
