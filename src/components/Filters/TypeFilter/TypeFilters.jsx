import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCounterpartyInvalidKpp } from "../../../redux/filters/filtersSlice";

// components
import FilterButton from "components/Filters/COMPONENTS/FilterButton/FilterButton";
import CheckBox from "components/General/CheckBox/CheckBox";
import UniButton from "components/General/UniButton/UniButton";

// icons
import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";
import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
import { ReactComponent as IconFilterSettingts } from "assets/icons/iconFilterSettings.svg";

// styles
import s from "./TypeFilters.module.scss";

const TypeFilter = ({
  isFetching,
  setActiveFilter,
  clearActiveFilter,
  name,
}) => {
  const dispatch = useDispatch();
  const { counterpartyInvalidKpp = 0 } = useSelector((state) => state.filters);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const [done, setDone] = useState(false);
  const [invalidOnly, setInvalidOnly] = useState(
    Boolean(counterpartyInvalidKpp)
  );

  useEffect(() => {
    setDone(Boolean(counterpartyInvalidKpp));
  }, [counterpartyInvalidKpp]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenModal(false);
        if (!counterpartyInvalidKpp) {
          clearActiveFilter();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openModal, clearActiveFilter, counterpartyInvalidKpp]);

  const handleOpen = () => {
    if (openModal) {
      setOpenModal(false);
      clearActiveFilter();
      return;
    }

    setInvalidOnly(Boolean(counterpartyInvalidKpp));
    setOpenModal(true);
    setActiveFilter(name);
  };

  const handleConfirm = () => {
    dispatch(setCounterpartyInvalidKpp(invalidOnly ? 1 : 0));
    if (invalidOnly) {
      setActiveFilter(name);
    } else {
      clearActiveFilter();
    }
    setOpenModal(false);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setCounterpartyInvalidKpp(0));
    setInvalidOnly(false);
    setDone(false);
    setOpenModal(false);
    clearActiveFilter();
  };

  return (
    <div className={s.root}>
      <FilterButton
        title="Фильтры"
        Icon={IconFilterSettingts}
        count={counterpartyInvalidKpp ? 1 : 0}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        done={done}
        load={Boolean(isFetching)}
      />

      <div
        ref={modalRef}
        className={classNames(s.modal, openModal && s.modal_open)}
      >
        <div className={s.block}>
          <div className={s.blockTitle}>Требуют внимания</div>

          <div className={s.item} onClick={() => setInvalidOnly((prev) => !prev)}>
            <CheckBox active={invalidOnly} />
            <span>Уточнить КПП</span>
          </div>
        </div>

        <div className={s.buttons}>
          <UniButton
            onClick={handleReset}
            text="Сбросить"
            icon={IconCloseBlue}
            isLoading={false}
            type="outline"
          />
          <UniButton
            onClick={handleConfirm}
            text="Применить"
            icon={IconDoneWhite}
            isLoading={false}
            width={218}
          />
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
