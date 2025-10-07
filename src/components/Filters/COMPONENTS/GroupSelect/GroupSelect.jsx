import { useEffect, useRef,useState } from 'react';
import classNames from 'classnames';

//utils
import { handleSearchGroup } from 'utils/SearchGroups';

//components
import CheckBoxList from 'components/Filters/COMPONENTS/CheckBoxList/CheckBoxList';

import { ReactComponent as IconCloseBlue } from 'assets/icons/iconCloseBlue.svg';
//icons
import { ReactComponent as IconDoneWhite } from 'assets/icons/iconDoneWhite.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';

import s from './GroupSelect.module.scss';

import UniButton from '../../../General/UniButton/UniButton';

const GroupSelect = ({
  buttonRef,
  groups,
  activeGroup,
  setActiveGroup,
  openModal,
  setOpenModal,
  handleReset,
  handleConfirm,
  bottom,
  inList,
  inModal,
  isSearch,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const modalRef = useRef();

  const handlePrevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalRef.current && !modalRef.current.contains(e.target) && setOpenModal(false);
  };

  useEffect(() => {
    setSearchList(groups);
  }, [groups]);

  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    setSearchQuery(value);
    const result = handleSearchGroup(value, groups);
    setSearchList(result);
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
    <>
      <div
        onClick={handlePrevent}
        ref={modalRef}
        className={classNames(
          s.modal,
          openModal && s.modal_open,
          inList && s.modal_inlist,
          bottom && s.modal_bottom
        )}
      >
        <div className={s.title}>{title}</div>
        {isSearch && (
          <div className={s.search}>
            <input
              type="text"
              placeholder="Искать..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <IconSearch />
          </div>
        )}

        <div className={classNames(s.block, inList && s.block_inlist, inModal && s.block_modal)}>
          {searchList.map((group) => (
            <div key={group.city} className={s.group}>
              <div className={s.groupTitle}>{group.city}</div>
              <CheckBoxList
                list={group.companies}
                active={activeGroup}
                setActive={setActiveGroup}
              />
            </div>
          ))}
        </div>

        <div className={s.buttons}>
          <UniButton
            iconPosition="right"
            handler={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            isLoading={false}
            type="outline"
            width={130}
          />

          <UniButton
            iconPosition="right"
            handler={handleConfirm}
            text="Выбрать"
            icon={IconDoneWhite}
            isLoading={false}
            width={268}
          />
        </div>
      </div>

      {/*  {openModal && <div onClick={handlePrevent} className={s.overlay}></div>} */}
    </>
  );
};

export default GroupSelect;
