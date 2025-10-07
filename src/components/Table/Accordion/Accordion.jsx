//libs
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import 'react-toastify/dist/ReactToastify.css';

//components
import AmountFormatted from 'components/General/AmountFormatted/AmountFormatted';
import Goal from 'components/General/Goal/Goal';

//hooks
import { useNavigate } from 'react-router-dom';

//icons
import { ReactComponent as ArrowBendDownRight } from 'assets/icons/ArrowBendDownRight.svg';

// Styles
import s from './Accordion.module.scss';

const Accordion = ({ isOpen, rows, type }) => {
  const contentRef = useRef(null);
  const navigate = useNavigate();
  const [height, setHeight] = useState('0px');
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [wasOpened, setWasOpened] = useState(false);
  const handleClickNavigate = ({ id, inn, kpp, name }) => {
    navigate(`${id}`, {
      company: { inn, kpp, name },
    });
  };

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);
    }
  }, [isOpen, shouldRender]);
  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const scrollHeight = contentRef.current.scrollHeight;
      requestAnimationFrame(() => {
        setHeight(`${scrollHeight}px`);
        setWasOpened(true);
      });
    } else if (wasOpened) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(`${scrollHeight}px`);
      requestAnimationFrame(() => {
        setHeight('0px');
      });
    }
  }, [isOpen, rows.length, shouldRender, wasOpened]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
      setWasOpened(false);
    }
  };

  if (!shouldRender) return null;

  console.log(rows)



  return (
    <div
      style={{
        height: height,
        overflow: 'hidden',
        transition: 'height 0.2s ease',
      }}
      className={classNames(s.accordionContent)}
      onTransitionEnd={handleTransitionEnd}
    >
      <div ref={contentRef}>
        {type === 'clientsDebts' &&
          rows.map((row) => (
            <>
              <div
                key={row.id}
                className={classNames(s.gridRow, s.clientsDebts)}
                onClick={() =>
                  handleClickNavigate({ id: row.c_id, inn: row.inn, kpp: row.kpp, name: row.name })
                }
              >
                <div className={classNames(s.gridCell, s.firstCell, s.gray)}>
                  <div className={s.companyName}>
                    <ArrowBendDownRight />
                    <Goal text={row?.name} />
                  </div>
                </div>
                <div className={classNames(s.gridCell, s.gray)}></div>
                <div className={classNames(s.gridCell, s.gray)}></div>
                <div className={classNames(s.gridCell, s.right)}>
                  <AmountFormatted value={parseInt((row.sum || 0).toString().replace('-', ''))} />
                </div>
                <div className={classNames(s.gridCell, s.right)}></div>
                <div className={classNames(s.gridCell, s.right)}>
                  <AmountFormatted value={row?.revenue_sum} />{' '}
                </div>
                <div className={classNames(s.gridCell, s.center)}>{row?.last_order_date === 0 ? '' : row?.last_order_date}</div>
                <div className={classNames(s.gridCell)}></div>
                {/* <div className={classNames(s.gridCell)}>
                <Act />
              </div>
              <div className={classNames(s.gridCell, s.button)}></div> */}
              </div>
              <div className={s.line}></div>
            </>
          ))}
        {type === 'ourDebts' &&
          rows.map((row) => (
            <div
              className={classNames(s.gridRow, s.ourDebts)}
              key={row.id}
              onClick={() =>
                handleClickNavigate({ id: row.id, inn: row.inn, kpp: row.kpp, name: row.name })
              }
            >
              <div className={classNames(s.gridCell, s.firstCell)}>
                <div className={s.companyName}>
                  <ArrowBendDownRight />
                  {row?.name}
                </div>
              </div>
              <div className={classNames(s.gridCell, s.gray)}></div>
              <div className={classNames(s.gridCell, s.gray)}></div>
              <div className={classNames(s.gridCell, s.right)}>
                <AmountFormatted value={parseInt((row.sum || 0).toString().replace('-', ''))} />
              </div>
              <div className={classNames(s.gridCell)}>{/* <Goal text={row?.note} /> */}</div>
              <div className={classNames(s.gridCell)}>
                {row.hasAct && (
                  <div className={s.showOnHover}>
                    <Act />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Accordion;

const Act = () => {
  return <div className={classNames(s.act, s.showOnHover)}>Акт сверки</div>;
};
