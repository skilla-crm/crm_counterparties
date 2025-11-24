// import { useEffect, useRef, useState } from "react";
// // redux
// import { useDispatch, useSelector } from "react-redux";
// import { setCounterpartiesCorrectKpp } from "../../../redux/filters/filtersSlice";

// // components
// import FilterButton from "components/Filters/COMPONENTS/FilterButton/FilterButton";
// import CheckBox from "components/General/CheckBox/CheckBox";
// import UniButton from "components/General/UniButton/UniButton";

// // icons
// import { ReactComponent as IconCloseBlue } from "assets/icons/iconCloseBlue.svg";
// import { ReactComponent as IconDoneWhite } from "assets/icons/iconDoneWhite.svg";
// import { ReactComponent as IconFilterSettingts } from "assets/icons/iconFilterSettings.svg";

// // styles
// import s from "./TypeFilters.module.scss";
// import classNames from "classnames";

// const counterpartyCorrectKppList = [{ id: "income", name: "Поступления" }];

// const TypeFilter = ({
//   isFetching,
//   setActiveFilter,
//   clearActiveFilter,
//   name,
// }) => {
//   const selectedCorrectKpp =
//     useSelector((state) => state.filters.counterpartyCorrectKpp) || 0;

//   const [openModal, setOpenModal] = useState(false);
//   const [transactionType, setTransactionType] = useState([]);

//   const [load, setLoad] = useState(false);
//   const [done, setDone] = useState(false);

//   const dispatch = useDispatch();
//   const modalRef = useRef();
//   const buttonRef = useRef();

//   useEffect(() => {
//     setLoad(isFetching);

//       selectedRecognizedType === "1";
//     setDone(!isFetching && hasActiveFilters);
//   }, [isFetching, selectedTypes, selectedViews, selectedRecognizedType]);

//   const handleOpen = () => {
//     setTransactionType(selectedTypes);
//     setTransactionView(selectedViews);
//     setRecognizedType(selectedRecognizedType);
//     setOpenModal(true);
//     setActiveFilter(name);
//   };

//   const handleToggle = (id, list, setList) => {
//     setList((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleConfirm = () => {
//     setLoad(true);
//     setActiveFilter(name);
//     dispatch(setCounterpartiesCorrectKpp(1));

//     setOpenModal(false);
//   };

//   const handleReset = (e) => {
//     e.stopPropagation();
//     dispatch(setCounterpartiesCorrectKpp(0));

//     setOpenModal(false);
//     setDone(false);
//     clearActiveFilter();
//   };

//   useEffect(() => {
//     const clickOutside = (e) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(e.target) &&
//         !buttonRef.current.contains(e.target)
//       ) {
//         setOpenModal(false);
//       }
//     };
//     document.body.addEventListener("mousedown", clickOutside);
//     return () => document.body.removeEventListener("mousedown", clickOutside);
//   }, []);

//   return (
//     <div className={s.root}>
//       <FilterButton
//         title="Фильтры"
//         Icon={IconFilterSettingts}
//         count={
//           selectedTypes.length +
//           (selectedViews.length || Number(selectedRecognizedType))
//         }
//         handleReset={handleReset}
//         handleOpen={handleOpen}
//         buttonRef={buttonRef}
//         done={done}
//         load={load}
//       />

//       <div
//         ref={modalRef}
//         className={classNames(s.modal, openModal && s.modal_open)}
//       >
//         <div className={s.block}>
//           <div className={s.blockTitle}>Требуют внимания</div>

//           <div
//             key={item.id}
//             className={s.item}
//             onClick={() =>
//               handleToggle(item.id, transactionType, setTransactionType)
//             }
//           >
//             <CheckBox active={transactionType.includes(item.id)} />
//             <span className={s.checkboxLabel}>{item.name}</span>
//           </div>
//         </div>

//         <div className={s.buttons}>
//           <UniButton
//             onClick={handleReset}
//             text="Сбросить"
//             icon={IconCloseBlue}
//             isLoading={false}
//             type="outline"
//           />
//           <UniButton
//             onClick={handleConfirm}
//             text="Применить"
//             icon={IconDoneWhite}
//             isLoading={false}
//             width={218}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TypeFilter;
