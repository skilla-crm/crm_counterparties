import s from './Goal.module.scss';
import { useEffect, useState, useRef } from 'react';
//components
import Tooltip2 from 'components/General/Tooltip2/Tooltip2';

const Goal = ({ text }) => {
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const textRef = useRef();

    useEffect(() => {
        const checkOverflow = () => {
            const el = textRef.current;
            if (el) {
                setIsOverflowed(el.scrollWidth > el.clientWidth);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [text]);

    const handleMouseEnter = () => setTooltipOpen(true);
    const handleMouseLeave = () => setTooltipOpen(false);

    return (
        <div className={s.root}>
            <div
                className={s.container}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <p ref={textRef} className={`${s.textEllipsis} `}>
                    {text}
                </p>
                {isOverflowed && (
                    <Tooltip2
                        open={tooltipOpen}
                        text={text}
                        maxWidth={Math.max(
                            textRef.current?.offsetWidth || 300,
                            300
                        )}
                        left={false}
                        bottom={false}
                        anchorRef={textRef}
                    />
                )}
            </div>
        </div>
    );
};

export default Goal;
