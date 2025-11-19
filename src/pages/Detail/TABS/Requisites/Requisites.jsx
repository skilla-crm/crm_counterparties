import dayjs from "dayjs";
import s from "./Requisites.module.scss";

const isValidValue = (value) => {
  if (value === null || value === undefined) return false;
  const strValue = String(value).trim();
  return strValue !== "" && strValue !== "0";
};

const formatValue = (value) => (isValidValue(value) ? value : "-");

const Requisites = ({ general = {}, requisites = {} }) => {
  const { name, inn, kpp, ogrn, date_add } = general;

  const {
    director,
    director_position,
    director_rod,
    signatory,
    address,
    ur_address,
    edo_id,
    is_percent,
  } = requisites;

  return (
    <div className={s.root}>
      <div className={s.gridContainer}>
        <div className={s.row}>
          <p>Наименование</p>
          <div>{formatValue(name)}</div>
        </div>

        <div className={s.row}>
          <p>ИНН</p>
          <div>{formatValue(inn)}</div>
        </div>

        <div className={s.row}>
          <p>КПП</p>
          <div>{formatValue(kpp)}</div>
        </div>

        <div className={s.row}>
          <p>ОГРН</p>
          <div>{formatValue(ogrn)}</div>
        </div>

        <div className={s.row}>
          <p>ФИО лица, действ. без доверенности</p>
          <div>{formatValue(director)}</div>
        </div>

        <div className={s.row}>
          <p>Должность</p>
          <div>{formatValue(director_position)}</div>
        </div>

        <div className={s.row}>
          <p>Действует на основании</p>
          <div>{formatValue(director_rod)}</div>
        </div>

        <div className={s.row}>
          <p>Подписант по доверенности</p>
          <div>
            <span> {formatValue(signatory?.full_name)}</span>
            {isValidValue(signatory?.doc_validity_period) && (
              <p>{`действует до ${dayjs(signatory.doc_validity_period).format("DD.MM.YYYY")}`}</p>
            )}
          </div>
        </div>

        <div className={s.row}>
          <p>Юр. адрес</p>
          <div>{formatValue(ur_address)}</div>
        </div>

        <div className={s.row}>
          <p>Факт. адрес</p>
          <div>{formatValue(address)}</div>
        </div>

        <div className={s.row}>
          <p>Идентификатор ЭДО</p>
          <div>{formatValue(edo_id)}</div>
        </div>

        <div className={s.row}>
          <p>Процент</p>
          <div>{formatValue(is_percent)}</div>
        </div>

        <div className={s.row}>
          <p>Добавлен</p>
          <p
            style={{
              color: date_add ? "" : "#000",
            }}
          >
            {date_add ? dayjs(date_add).format("DD.MM.YYYY") : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Requisites;
