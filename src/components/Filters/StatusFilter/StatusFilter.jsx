import { use, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { selectSelectedStatus } from '../../../redux/filters/filtersSelectors';

// components
import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
import UniButton from 'components/General/UniButton/UniButton';
// import CheckBox from 'components/General/CheckBox/CheckBox';
import RadioButtons from 'components/General/RadioButtons/RadioButtons';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as OtherIcon } from 'assets/icons/otherIcon.svg';
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';

import s from './StatusFilter.module.scss';

import { setSelectedStatus } from '../../../redux/filters/filtersSlice';

const extractionsStatuses = [
  { id: '0', name: 'Не совпадают' },
  { id: '1', name: 'Совпадают' },
];

const StatusFilter = ({ isFetching, setActiveFilter, clearActiveFilter, name }) => {
  const selectedStatus = useSelector(selectSelectedStatus);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [tempStatus, setTempStatus] = useState('');

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const done = !isFetching && selectedStatus !== '';

  useEffect(() => {
    setTempStatus(selectedStatus || '');
  }, [selectedStatus]);

  useEffect(() => {
    if (selectedStatus !== '') {
      setActiveFilter(name);
    } else {
      clearActiveFilter();
    }
  }, [selectedStatus, name, setActiveFilter, clearActiveFilter]);

  const handleOpen = () => {
    setTempStatus(selectedStatus || '');
    setOpenModal(true);
  };

  const handleToggle = (id) => {
    setTempStatus((prev) => (prev === id ? '' : id));
  };

  const handleConfirm = () => {
    dispatch(setSelectedStatus(tempStatus));
    setOpenModal(false);
  };

  const handleReset = (e) => {
    if (e) e.stopPropagation();
    dispatch(setSelectedStatus(''));
    setOpenModal(false);
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenModal(false);
      }
    };
    document.body.addEventListener('mousedown', clickOutside);
    return () => document.body.removeEventListener('mousedown', clickOutside);
  }, []);

  return (
    <div className={s.root}>
      <FilterButton
        title="Другое"
        Icon={OtherIcon}
        count={selectedStatus !== '' ? 1 : ''}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        load={isFetching}
        done={done}
      />

      <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
        <div className={s.block}>
          <div className={s.blockTitle}>Сумма заказов и УПД</div>
          <RadioButtons list={extractionsStatuses} active={tempStatus} setActive={setTempStatus} />
          {/* {extractionsStatuses.map((item) => (
            <div key={item.id} className={s.item} onClick={() => handleToggle(item.id)}>
              <CheckBox active={tempStatus === item.id} />
              <span className={s.checkboxLabel}>{item.name}</span>
            </div>
          ))} */}
        </div>

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            isLoading={false}
            type="outline"
            width={108}
          />

          <UniButton
            onClick={handleConfirm}
            text="Применить"
            icon={IconDoneWhite}
            isLoading={false}
            width={140}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;
