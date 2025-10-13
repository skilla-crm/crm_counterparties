import s from "./CompanyList.module.scss";

const CompanyListInn = ({
  list,
  openList,
  listScroll,
  noFind,
  handleChose,
  selectedInn,
}) => {
  return (
    <ul
      className={`${s.list} ${openList && s.list_open} ${
        listScroll && s.list_scroll
      }`}
    >
      {list.map((el) => (
        <li
          key={el.data.hid}
          onMouseDown={() => handleChose(el.data)}
          className={el.data.inn === selectedInn ? s.item_active : ""}
        >
          <p>{el.value}</p>
          <span>
            ИНН {el.data.inn} {el.data.kpp && `КПП ${el.data.kpp}`}
          </span>
        </li>
      ))}
      {noFind && <li className={s.nofound}>Не найдено в реестре компаний</li>}
    </ul>
  );
};

export default CompanyListInn;
