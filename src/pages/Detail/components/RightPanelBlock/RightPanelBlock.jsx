// External
import classNames from "classnames";
import dayjs from "dayjs";

// Utils
import formatNumWithSpace from "utils/formatNumWithSpace";

// Components
import EllipsisWithTooltip from "components/General/EllipsisWithTooltip/EllipsisWithTooltip";

// Icons
import { ReactComponent as IconArrowRight } from "assets/icons/iconTopRight.svg";

// Styles
import s from "./RightPanelBlock.module.scss";

import { Link } from "react-router-dom";

const RightPanelBlock = ({ list = [], title, counterpartyId }) => {
  if (!Array.isArray(list) || list.length === 0) return null;

  const RowComponent =
    {
      Заказы: ListRowOrders,
      Транзакции: ListRowTransaction,
      Документы: ListRowDocs,
      Взаиморасчеты: ListRowPartnerships,
    }[title] || ListRowDocs;

  const lastDateOrder = list?.[0]?.date;

  return (
    <div className={s.rightPanelBlock}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.list}>
        {list.map((elem) => (
          <RowComponent key={elem.id} elem={elem} counterpartyId={counterpartyId} />
        ))}
      </div>
      {title === "Документы" && (
        <div className={s.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/bills?counterparty_id=${counterpartyId}`}
          >
            <IconArrowRight />
            Все счета
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/upd?counterparty_id=${counterpartyId}`}
          >
            <IconArrowRight />
            Все упд
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/act?counterparty_id=${counterpartyId}`}
          >
            <IconArrowRight />
            Все акты
          </Link>
        </div>
      )}
      {title === "Заказы" && (
        <div className={s.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/orders?counterparty_id=${counterpartyId}&lastdate=${lastDateOrder}`}
          >
            <IconArrowRight />
            Посмотреть все
          </Link>
        </div>
      )}
      {title === "Транзакции" && (
        <div className={s.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/bank?counterparty_id=${counterpartyId}`}
          >
            <IconArrowRight />
            Посмотреть все
          </Link>
        </div>
      )}
    </div>
  );
};

const ListRowOrders = ({ elem }) => {
  const { id, sum, date, address } = elem;

  return (
    <div className={s.listRow} key={id}>
      <div className={s.leftColumn}>
        <span>{date && dayjs(date).format("DD.MM.YYYY")}</span>

        <EllipsisWithTooltip text={address || ""} />
      </div>
      <div className={classNames(s.rightColumn)}>
        {formatNumWithSpace(sum || "")}
      </div>
    </div>
  );
};
const ListRowTransaction = ({ elem }) => {
  const { id, sum, date, goal, type } = elem;

  return (
    <div className={s.listRow} key={id}>
      <div className={s.leftColumn}>
        <span>{dayjs(date).format("DD.MM.YYYY")}</span>
        <EllipsisWithTooltip text={goal || ""} />
      </div>
      <div
        className={classNames(s.rightColumn, type === "income" && s.greenText)}
      >
        {sum && (
          <span>{`${type === "outcome" ? "-" : "+"}${formatNumWithSpace(sum)}`}</span>
        )}
      </div>
    </div>
  );
};

const ListRowDocs = ({ elem }) => {
  const { id, sum, date, type, num } = elem;
  const TYPES = {
    0: "Счет",
    1: "Акт",
    2: "Счет-фактура",
    3: "УПД",
    4: "Акт-сверки",
    5: "Авансовый счет-фактура",
  };
  return (
    <div className={s.listRow} key={id}>
      <div className={s.leftColumn}>
        <span>{dayjs(date).format("DD.MM.YYYY")}</span>
        <span>{`${TYPES[type] || ""} №${num || ""}`}</span>
      </div>
      <div className={classNames(s.rightColumn)}>
        {" "}
        {sum && <span>{formatNumWithSpace(sum)}</span>}
      </div>
    </div>
  );
};

const ListRowPartnerships = ({ elem, counterpartyId }) => {
  const { id, partnership_id, name } = elem;
  return (
    <div className={s.listRow} key={id}>
      <div className={s.leftColumn}>
        {name}
      </div>
      <div className={classNames(s.rightColumn)}>
        <div className={s.links}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className={s.link}
            to={`https://lk.skilla.ru/new/debts/${counterpartyId}?partner=${partnership_id}`}
          >
            <IconArrowRight />
            Перейти
          </Link>
        </div>
      </div>

    </div>
  );
};

export default RightPanelBlock;
