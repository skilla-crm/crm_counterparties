import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

//redux
import { useDispatch, useSelector } from "react-redux";
import { resetSort, setSort } from "../../redux/sorting/sortSlice";

//components
import SortButton from "components/General/SortButton/SortButton";

//styles
import s from "./Sorting.module.scss";

//icons
import { ReactComponent as IconElevator } from "../../assets/icons/iconElevator.svg";
import { ReactComponent as IconDoneBlue } from "../../assets/icons/iconDoneBlue.svg";

const sortingList = [
  { id: 1, text: "По умолчанию", type: "sum", dir: "-" }, //по убыванию доли от моей выручки
  { id: 2, text: "По авлфавиту с A", type: "sum", dir: "" },
  { id: 3, text: "По алфавиту с Я", type: "revenue_year", dir: "-" },
  {
    id: 4,
    text: "По возрастанию доли от моей выручки",
    type: "revenue_year",
    dir: "",
  },
  {
    id: 5,
    text: "По убыванию выручки",
    type: "last_order_date",
    dir: "",
  },
  { id: 6, text: "По возрастанию выручки", type: "last_order_date", dir: "-" },
  {
    id: 7,
    text: "Сначала заполненные карточки",
    type: "risk_status",
    dir: "-",
  },
  { id: 8, text: "Сначала пустные карточки", type: "risk_status", dir: "" },
  { id: 9, text: "По убыванию численности", type: "risk_status", dir: "" },
  { id: 10, text: "По возрастанию численности", type: "risk_status", dir: "" },
];

const Sorting = ({
  type,
  isFetching,
  setActiveFilter,
  clearActiveFilter,
  name,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const { sortBy, sortDir } = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const buttonRef = useRef();
  const handleActive = (el) => {
    setActiveFilter(name);
    dispatch(setSort({ type: el.type, dir: el.dir }));
  };

  const options = type === "ourDebts" ? sortingList.slice(0, 2) : sortingList;
  const isSelected = (el) => sortBy === el.type && sortDir === el.dir;

  useEffect(() => {
    if (sortBy !== "sum" || sortDir !== "-") {
      setActiveFilter(name);
    } else {
      clearActiveFilter();
    }
  }, [sortBy, sortDir, name, setActiveFilter, clearActiveFilter]);

  const handleOpen = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  const handleReset = (e) => {
    clearActiveFilter();
    e.preventDefault();
    e.stopPropagation();
    dispatch(resetSort());
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
    document.body.addEventListener("mousedown", clickOutside);
    return () => document.body.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className={s.root}>
      <SortButton
        title="Сортировка"
        Icon={IconElevator}
        load={isFetching}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
        sort={sortBy !== "sum" || sortDir !== "-"}
      />
      <div
        ref={modalRef}
        className={classNames(s.modal, openModal && s.modal_open)}
      >
        <span className={s.span}>Показать сначала</span>
        <ul className={s.list}>
          {options.map((el) => (
            <li key={el.id} onClick={() => handleActive(el)} className={s.item}>
              {el.text}
              <span
                className={classNames(s.icon, isSelected(el) && s.icon_vis)}
              >
                <IconDoneBlue />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sorting;
