import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as IconChevronUp } from 'assets/icons/iconChevronUp.svg';

import s from './ScrollToTopBtn.module.scss';

const ScrollToTopButton = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const toggleVisibility = () => {
      setIsVisible(container.scrollTop > 300);
    };

    container.addEventListener('scroll', toggleVisibility);
    return () => container.removeEventListener('scroll', toggleVisibility);
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={classNames(s.wrapper, { [s.visible]: isVisible })}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <IconChevronUp className={s.icon} />
    </div>
  );
};
export default ScrollToTopButton;
