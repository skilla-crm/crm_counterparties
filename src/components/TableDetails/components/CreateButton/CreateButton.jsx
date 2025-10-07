import { useState, useEffect, useRef } from 'react';
//icons
import { ReactComponent as IconPlusBlue } from 'assets/icons/iconPlusBlue.svg';
import { ReactComponent as IconChevronDown } from 'assets/icons/iconChewron.svg';
import { ReactComponent as IconAttachBlack } from 'assets/icons/IconAttachBlack.svg';
import { ReactComponent as IconPlusDoc } from 'assets/icons/PlusDoc.svg';
import { ReactComponent as IconLine } from 'assets/icons/iconLine.svg';
//styles
import s from './CreateButton.module.scss';
import classNames from 'classnames';

//components
import CheckBoxList from 'components/General/CheckBoxList/CheckBoxList';

const CreateDocButton = ({ type, orders, selectedOrders, setSelectedOrders, isVisibleButton, setIsVisibleButton, ...props }) => {
  const [open, setOpen] = useState(false);
  const [openSelectOrders, setOpenSelectOrders] = useState('')
  const dropdownRef = useRef(null);
  const { handleCreate, handleAttach } = props;

  useEffect(() => {
    if (openSelectOrders !== '') {
      setIsVisibleButton(true)
    } else {
      setIsVisibleButton(false)
    }
  }, [openSelectOrders])

  const toggleMenu = () => {
    if (openSelectOrders !== '') {
      return
    }
    const newOpen = !open;
    setOpen(newOpen);
    setIsVisibleButton(newOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setIsVisibleButton(false);
        setOpenSelectOrders('')
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsVisibleButton]);

  return (
    <div className={s.createContainer} ref={dropdownRef}>
      <div className={s.block}>
        <button className={s.createButton} onClick={() => orders?.length > 1 ? setOpenSelectOrders('createupd') : handleCreate((type === 'attachUpd' || type === 'doc') ? 'upd' : 'acts')}>
          <IconPlusBlue className={s.icon} />
          <span>Создать</span>
        </button>

        <div onClick={toggleMenu} className={s.block_arrow}>
          <IconLine />
          <IconChevronDown className={open ? s.arrow_up : s.arrow} />
        </div>
      </div>

      {type !== 'doc' && (
        <div className={classNames(s.dropdownMenu, open && s.dropdownMenu_open)}>
          <div
            className={s.dropdownItem}
            onClick={() => {
              handleCreate();
              toggleMenu();
            }}
          >
            <IconPlusDoc />
            <span className={s.dropdownText}>Создать</span>
          </div>
          <div
            className={s.dropdownItem}
            onClick={() => {
              handleAttach();
              toggleMenu();
            }}
          >
            <IconAttachBlack />
            <span className={s.dropdownText}>Прикрепить</span>
          </div>
        </div>
      )}

      {type === 'doc' && (
        <div
          className={classNames(s.dropdownMenu, s.dropdownMenu_2, open && s.dropdownMenu_2_open)}
        >
          <div
            className={s.dropdownItem}
            onClick={() => {
              if (orders?.length > 1) {
                setOpenSelectOrders('createupd')
              } else {
                handleCreate('upd');
              }
              toggleMenu();
            }}
          >
            <IconPlusDoc />
            <span className={s.dropdownText}>Создать УПД</span>
          </div>

          <div
            className={s.dropdownItem}
            onClick={() => {
              if (orders?.length > 1) {
                setOpenSelectOrders('createact')
              } else {
                handleCreate('acts');
              }
              toggleMenu();
            }}
          >
            <IconPlusDoc />
            <span className={s.dropdownText}>Создать Акт</span>
          </div>
          <div
            className={s.dropdownItem}
            onClick={() => {
              if (orders?.length > 1) {
                setOpenSelectOrders('attachupd')
              } else {
                handleAttach('upd');
              }
              toggleMenu();
            }}
          >
            <IconAttachBlack />
            <span className={s.dropdownText}>Прикрепить УПД</span>
          </div>

          <div
            className={s.dropdownItem}
            onClick={() => {
              if (orders?.length > 1) {
                setOpenSelectOrders('attachact')
              } else {
                handleAttach('acts');
              }
              toggleMenu();
            }}
          >
            <IconAttachBlack />
            <span className={s.dropdownText}>Прикрепить Акт</span>
          </div>
        </div>
      )}
      {type === 'attachUpd' && (
        <div
          className={classNames(s.dropdownMenu, s.dropdownMenu_3, open && s.dropdownMenu_3_open)}
        >
          <div
            className={s.dropdownItem}
            onClick={() => {
              handleCreate('upd');
              toggleMenu();
            }}
          >
            <IconPlusDoc />
            <span className={s.dropdownText}>Создать УПД</span>
          </div>

          <div
            className={s.dropdownItem}
            onClick={() => {
              handleAttach('upd');
              toggleMenu();
            }}
          >
            <IconAttachBlack />
            <span className={s.dropdownText}>Прикрепить УПД</span>
          </div>
        </div>
      )}
      {type === 'attachAct' && (
        <div
          className={classNames(s.dropdownMenu, s.dropdownMenu_3, open && s.dropdownMenu_3_open)}
        >
          <div
            className={s.dropdownItem}
            onClick={() => {
              handleCreate('acts');
              toggleMenu();
            }}
          >
            <IconPlusDoc />
            <span className={s.dropdownText}>Создать Акт</span>
          </div>

          <div
            className={s.dropdownItem}
            onClick={() => {
              handleAttach('acts');
              toggleMenu();
            }}
          >
            <IconAttachBlack />
            <span className={s.dropdownText}>Прикрепить Акт</span>
          </div>
        </div>
      )}

      {orders?.length > 1 && <div
        className={classNames(s.dropdownMenu, s.dropdownMenu_4, openSelectOrders !== '' && s.dropdownMenu_4_open)}
      >
        <span>Выбери заказы</span>
        <CheckBoxList
          list={orders}
          active={selectedOrders}
          setActive={setSelectedOrders}
          column={false}
        />

        {openSelectOrders === 'createupd' && <button
          onClick={() => handleCreate('upd')}
          className={classNames(s.createButton, selectedOrders?.length === 0 && s.createButton_disabled, s.createButton_2)}>
          Создать УПД
        </button>}

        {openSelectOrders === 'createact' && <button
          onClick={() => handleCreate('acts')}
          className={classNames(s.createButton, selectedOrders?.length === 0 && s.createButton_disabled, s.createButton_2)}>
          Создать Акт
        </button>}

        {openSelectOrders === 'attachupd' && <button
          onClick={() => handleAttach('upd')}
          className={classNames(s.createButton, selectedOrders?.length === 0 && s.createButton_disabled, s.createButton_2)}>
          Прикрепить УПД
        </button>}

        {openSelectOrders === 'attachact' && <button
          onClick={() => handleAttach('acts')}
          className={classNames(s.createButton, selectedOrders?.length === 0 && s.createButton_disabled, s.createButton_2)}>
          Прикрепить Акт
        </button>}
      </div>}

    </div>
  );
};

export default CreateDocButton;
